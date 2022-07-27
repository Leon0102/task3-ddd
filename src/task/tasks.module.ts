/* eslint-disable prettier/prettier */
import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryRepository } from 'src/history/history.repository';
import { HistoryService } from 'src/history/history.service';
import { ListRepository } from 'src/project/infrastructure/repository/list.repository';
import { TasksController } from 'src/task/application/tasks.controller';
import { TasksService } from 'src/task/domain/task/tasks.service';
import { UserRepository } from 'src/user/infrastructure/repository/user.repository';
import { AssignLabelToTaskHandler } from './application/command/assign-label-to-task.handler';
import { AssignUserToTaskHandler } from './application/command/assign-user-to-task.handler';
import { CreateAttachmentHandler } from './application/command/create-attachment.handler';
import { CreateLabelHandler } from './application/command/create-label.handler';
import { CreateTaskHandler } from './application/command/create-task.handler';
import { CreateTodoHandler } from './application/command/create-todo.handler';
import { DeleteAttachmentHandler } from './application/command/delete-attachment.handler';
import { DeleteTaskHandler } from './application/command/delete-task.handler';
import { DeleteTodoHandler } from './application/command/delete-todo.handler';
import { RemoveLabelFromTaskHandler } from './application/command/remove-label-from-task.handler';
import { RemoveUserFromTaskHandler } from './application/command/remove-user-from-task.handler';
import { UpdateTaskHandler } from './application/command/update-task.handler';
import { ListDeletedHandler } from './application/event/list-deleted.handler';
import { GetOneTaskHandler } from './application/query/get-one-task.handler';
import { AttachmentsModule } from './attachments.module';
import { AttachmentRepository } from './infrastructure/repository/attachment.repository';
import { LabelRepository } from './infrastructure/repository/label.repository';
import { TaskRepository } from './infrastructure/repository/task.repository';
import { TodoRepository } from './infrastructure/repository/todo.repository';
import { LabelModule } from './label.module';
import { TodosModule } from './todos.module';


export const TaskRepoProvider: Provider[] = [{
  provide: 'UserRepository',
  useClass: UserRepository
},
{
  provide: 'ListRepository',
  useClass: ListRepository
},
{
  provide: 'TaskRepository',
  useClass: TaskRepository
},
{
  provide: 'AttachmentRepository',
  useClass: AttachmentRepository
},
{
  provide: 'LabelRepository',
  useClass: LabelRepository
},
{
  provide: 'TodoRepository',
  useClass: TodoRepository
},
]


@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository, HistoryRepository]), CqrsModule,
    LabelModule, AttachmentsModule, TodosModule],
  providers: [...TaskRepoProvider, ListDeletedHandler, HistoryService, TasksService, GetOneTaskHandler, CreateTaskHandler, CreateTodoHandler, CreateAttachmentHandler, CreateLabelHandler, DeleteTodoHandler, DeleteAttachmentHandler, RemoveLabelFromTaskHandler, UpdateTaskHandler, AssignUserToTaskHandler, RemoveUserFromTaskHandler, DeleteTaskHandler, AssignLabelToTaskHandler],
  controllers: [TasksController],
})
export class TasksModule { }
