/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from 'src/task/application/tasks.controller';
import { TasksService } from 'src/task/domain/task/tasks.service';
import { CreateAttachmentHandler } from './application/command/create-attachment.handler';
import { CreateLabelHandler } from './application/command/create-label.handler';
import { CreateTaskHandler } from './application/command/create-task.handler';
import { CreateTodoHandler } from './application/command/create-todo.handler';
import { DeleteAttachmentHandler } from './application/command/delete-attachment.handler';
import { DeleteTodoHandler } from './application/command/delete-todo.handler';
import { ListDeletedHandler } from './application/event/list-deleted.handler';
import { GetOneTaskHandler } from './application/query/get-one-task.handler';
import { AttachmentsService } from './domain/attachment/attachments.service';
import { AttachmentRepository } from './infrastructure/repository/attachment.repository';
import { LabelRepository } from './infrastructure/repository/label.repository';
import { TaskRepository } from './infrastructure/repository/task.repository';
import { TodoRepository } from './infrastructure/repository/todo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository, LabelRepository, TodoRepository, AttachmentRepository]), CqrsModule],
  providers: [Object, TasksService, GetOneTaskHandler, CreateTaskHandler, CreateTodoHandler, CreateAttachmentHandler, AttachmentsService, ListDeletedHandler, CreateLabelHandler, DeleteTodoHandler, DeleteAttachmentHandler],
  controllers: [TasksController],
})
export class TasksModule { }
