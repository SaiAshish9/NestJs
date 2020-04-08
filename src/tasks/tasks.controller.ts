import { Controller,Get,Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';

import {TasksService} from './tasks.service';
import { Task } from './task.entity';

import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';


@Controller('tasks')
export class TasksController {
    
    constructor( private tasksService: TasksService ){}


@Get()
getTasks(@Query(ValidationPipe)  filterDto:GetTasksFilterDto):Promise<Task[]> {

// if(Object.keys(filterDto).length){
//     return this.tasksService.getTasksWithFilters(filterDto)
// }else{
//     return this.tasksService.getAllTasks()

// }

return this.tasksService.getTasks(filterDto)


}


@Get('/:id')
getTaskById(@Param('id',ParseIntPipe) id:number): Promise<Task>{
return this.tasksService.getTaskById(id)
}



@Post()
@UsePipes(ValidationPipe)
createTask(@Body() createTaskDto:CreateTaskDto): Promise<Task>{

return this.tasksService.createTask(createTaskDto)   

    }

@Delete('/:id')
deleteTask(@Param('id') id:number):void{
    this.tasksService.deleteTask(id)
}


@Patch('/:id/status')
updateTaskStatus(
@Param('id')  id:number,
@Body('status',TaskStatusValidationPipe)  status:TaskStatus
):  Promise<Task> {
return this.tasksService.updateTaskStatus(id, status)
}

}
// @Body('title') title: string,
// @Body('description') description: string
