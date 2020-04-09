import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./get-tasks-filter.dto";
import { User } from "../auth/user.entity";
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception";
import { Logger } from "@nestjs/common";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    
 private logger = new Logger('TaskRepository')   

async getTasks(filterDto:GetTasksFilterDto,
    user:User
    ):Promise<Task[]> {

const {status,search}=filterDto
    
const query=this.createQueryBuilder('task')


query.where('task.userId= :userId',{userId:user.id})

if(status){

query.andWhere('task.status = :status',{status})


}

if(search){

query.andWhere('task.title LIKE :search OR task.description LIKE :search',{search : `%${search}%` })


}
try{
const task= await  query.getMany()
return task

}catch(e){
    this.logger.error(`failed to get tasks for ${user.username} ,Dto: ${JSON.stringify(filterDto)}`,e.stack)
    throw new InternalServerErrorException()
}


}


async createTask(
    createTaskDto:CreateTaskDto,
    user:User
    ): Promise<Task> {

    const {title, description}=createTaskDto

    const task=new Task()
  
    task.title = title
    task.description = description
    task.status=TaskStatus.OPEN
    task.user=user
 try{
    await task.save()
 }catch(e){
    this.logger.error(`failed to create task for ${user.username} ,Dto: ${createTaskDto}`,e.stack)
    throw new InternalServerErrorException()
 }
    delete task.user;

    return task


} 


}