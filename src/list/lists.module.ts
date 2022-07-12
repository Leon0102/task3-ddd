/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ListsController } from 'src/application/controllers/list.controller';
import { ListRepository } from './infrastructure/repository/list.repository';
import { TaskRepository } from '../task/infrastructure/repository/task.repository';
import { ProjectCreatedHandler } from './application/event/project-created.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { ProjectsService } from 'src/project/domain/projects.service';
import { ListsService } from './domain/list.service';
import { ProjectRepository } from 'src/project/infrastructure/repository/project.repository';
import { UserRepository } from 'src/user/infrastructure/repository/user.repository';
import { CreateListHandler } from './application/command/create-list.handler';
import { ListsController } from './application/lists.controller';
import { GetOneListHandler } from './application/query/get-one-list.handler';
import { ProjectDeletedHandler } from './application/event/project-deleted.handler';
import { UpdateListHandler } from './application/command/update-list.handler';
import { DeleteListHandler } from './application/command/delete-list.handler';

@Module({
  imports: [TypeOrmModule.forFeature([ListRepository, TaskRepository, ProjectRepository, UserRepository]), CqrsModule],
  controllers: [ListsController],
  providers: [Object, ProjectCreatedHandler, ProjectsService, ListsService, CreateListHandler, GetOneListHandler, ProjectDeletedHandler, UpdateListHandler, DeleteListHandler]
})
export class ListsModule { }
