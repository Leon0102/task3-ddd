/* eslint-disable prettier/prettier */
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ListsController } from 'src/application/controllers/list.controller';
import { ListRepository } from './infrastructure/repository/list.repository';
import { TaskRepository } from '../task/infrastructure/repository/task.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { ProjectsService } from 'src/project/domain/projects.service';
import { ListsService } from './domain/list.service';
import { ProjectRepository } from 'src/project/infrastructure/repository/project.repository';
import { UserRepository } from 'src/user/infrastructure/repository/user.repository';
import { CreateListHandler } from './application/command/create-list.handler';
import { GetOneListHandler } from './application/query/get-one-list.handler';
import { UpdateListHandler } from './application/command/update-list.handler';
import { DeleteListHandler } from './application/command/delete-list.handler';
import { HistoryService } from 'src/history/history.service';
import { HistoryRepository } from 'src/history/history.repository';

export const ListRepoProvider: Provider[] = [{
  provide: 'UserRepository',
  useClass: UserRepository
},
{
  provide: 'ProjectRepository',
  useClass: ProjectRepository
},
{
  provide: 'ListRepository',
  useClass: ListRepository
},
]


@Module({
  imports: [TypeOrmModule.forFeature([ListRepository, TaskRepository, HistoryRepository]), CqrsModule],
  controllers: [],
  providers: [...ListRepoProvider, HistoryService, ProjectsService, ListsService, CreateListHandler, GetOneListHandler, UpdateListHandler, DeleteListHandler]
})
export class ListsModule { }
