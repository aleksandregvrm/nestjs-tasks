import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { Logger } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  private logger = new Logger('Tasks Controller');
  constructor(private tasksService: TasksService) { 
   }

  @Get('/')
  @UseGuards(AuthGuard())
  getAllTasks(@Query() filterDto: GetTaskFilterDto, @GetUser() user: User): Promise<Task[]> {
    this.logger.verbose(`User - ${user.username}, retrieving all tasks `)
    return this.tasksService.getAllTasks(filterDto, user)
  }


  @Get("/:id")
  @UseGuards(AuthGuard())
  getTaskById(@Param("id") id: string,@GetUser()user:User): Promise<Task> {
    return this.tasksService.getTaskById(id,user);
  }

  @Post()
  @UseGuards(AuthGuard())
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    this.logger.verbose(`The user has been created by the user - ${user}, with properties ${JSON.stringify(createTaskDto)}`)
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id,user);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto, @GetUser() user: User): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}

