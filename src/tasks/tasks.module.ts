import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksController } from "./tasks.controller";
import { TasksRepository } from "./tasks.repository";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { AuthModule } from "src/auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [TypeOrmModule.forFeature([Task]),AuthModule,ConfigModule],
  // exports: [TasksService],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
})
export class TasksModule { }