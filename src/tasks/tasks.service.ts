import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

// import * as uuid from 'uuid/v1'

import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './get-tasks-filter.dto';

@Injectable()
export class TasksService {

constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
){}



async getTasks(filterDto:GetTasksFilterDto):Promise<Task[]>{

  return this.taskRepository.getTasks(filterDto)

}








async getTaskById(id: number) :Promise<Task> {

  const found= await this.taskRepository.findOne(id)

  if(!found){
 throw new NotFoundException(`Task with ID ${id} not found`)
}

return found

}


async createTask(createTaskDto:CreateTaskDto): Promise<Task> {

  return this.taskRepository.createTask(createTaskDto)


}


async deleteTask(id:number):Promise<void>{

const result=await this.taskRepository.delete(id)

if(result.affected === 0){
  throw new NotFoundException(`Task with ID ${id} not found`)
}

// console.log(result)

}


async updateTaskStatus(id: number,status:TaskStatus):Promise <Task> {

  const task=await  this.getTaskById(id)

task.status=status

await task.save()

return task

}


















// private tasks : Task[] = [];

// getAllTasks():Task[] {
//     return this.tasks
// }

// getTasksWithFilters(filterDto:GetTasksFilterDto): Task[]{
   
// const {status,search}=filterDto  


// let tasks=this.getAllTasks()

// if(status){
// tasks=tasks.filter(task=>task.status===status)
// }

// if(search){
//     tasks=tasks.filter(
//         task=>task.title.includes(search)||
//         task.description.includes(search)

        
//         )
//     }

//     return tasks
// }

// getTaskById(id:string) : Task {

//     const found= this.tasks.find(x=>x.id === id)
    
// if(!found){
//  throw new NotFoundException(`Task with ID ${id} not found`)
// }
// return found

//     }



// // title:string,description:string
// createTask(createTaskDto:CreateTaskDto):Task{


// const {title,description} = createTaskDto

// const task: Task={
//     id:uuid(),
//     title,
//     description,
//     status:TaskStatus.OPEN

// }

// this.tasks.push(task)

// return task

// }


// deleteTask(id:string):void{

// const found=this.getTaskById(id)

// this.tasks= this.tasks.filter(task => task.id !== found.id)

// }

// updateTaskStatus(id:string,status:TaskStatus): Task {

//     const task=this.getTaskById(id)
//     task.status=status
//     return task


// }



}
