import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository
    ) { }
    private tasks: [] = [];


    getAllTasks(filterDto: GetTaskFilterDto,user:User): Promise<Task[]> {
        return this.tasksRepository.getAllTasks(filterDto,user); 
    }

    createTask(createTaskDto: CreateTaskDto,user:User): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto,user)
    }

    async deleteTask(id: string, user:User): Promise<void> {
        const result = await this.tasksRepository.delete({id,user});
        if(result.affected === 0){
            throw new NotFoundException("No Such task id")
        }
        
    }

    async getTaskById(id: string,user:User): Promise<Task> {
        // const found = await this.tasksRepository.findOne({ where: { id } });
        const found = await this.tasksRepository.findOne({ where: { id, user } });
        if (!found) throw new NotFoundException(`Task with ID "${id}" not found!`);
        return found;
    }

    async updateTaskStatus(id: string, status: TaskStatus, user:User): Promise<Task> {
        const task = await this.getTaskById(id,user);
        task.status = status;
        await this.tasksRepository.save(task);
        return task;
    }
}
