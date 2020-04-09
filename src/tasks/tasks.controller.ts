import { Controller,Get,Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';

import {TasksService} from './tasks.service';
import { Task } from './task.entity';

import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';


@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    
    constructor( private tasksService: TasksService ){}


@Get()
getTasks(@Query(ValidationPipe)  filterDto:GetTasksFilterDto,
@GetUser() user:User
):Promise<Task[]> {

// if(Object.keys(filterDto).length){
//     return this.tasksService.getTasksWithFilters(filterDto)
// }else{
//     return this.tasksService.getAllTasks()

// }

return this.tasksService.getTasks(filterDto,user)


}


@Get('/:id')
getTaskById(@Param('id',ParseIntPipe) id:number,
@GetUser() user:User
): Promise<Task>{
return this.tasksService.getTaskById(id,user)
}


@Post()
@UsePipes(ValidationPipe)
createTask(
    @Body() createTaskDto:CreateTaskDto,
    @GetUser() user:User
):Promise<Task>{
    return this.tasksService.createTask(createTaskDto,user)
}



// @Post()
// @UsePipes(ValidationPipe)
// createTask(@Body() createTaskDto:CreateTaskDto): Promise<Task>{

// return this.tasksService.createTask(createTaskDto)   

//     }

@Delete('/:id')
deleteTask(@Param('id') id:number,
@GetUser() user:User
):void{
    this.tasksService.deleteTask(id,user)
}


@Patch('/:id/status')
updateTaskStatus(
@Param('id')  id:number,
@Body('status',TaskStatusValidationPipe)  status:TaskStatus,
@GetUser() user:User
):  Promise<Task> {
return this.tasksService.updateTaskStatus(id, status,user)
}

}
// @Body('title') title: string,
// @Body('description') description: string
