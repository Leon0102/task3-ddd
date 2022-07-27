/* eslint-disable prettier/prettier */
import { Module, Provider } from '@nestjs/common';
import { ProjectsService } from 'src/project/domain/projects.service';
import { ProjectsController } from 'src/project/application/projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRepository } from './infrastructure/repository/project.repository';
import { ListRepository } from './infrastructure/repository/list.repository';
import { UsersService } from 'src/user/domain/users.service';
import { UserRepository } from '../user/infrastructure/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { CreateProjectHandler } from './application/command/create-project.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { UserCreatedHandler } from './application/event/user-created.handler';
import { GetOneProjectHandler } from './application/query/get-one-project.handler';
import { UpdateProjectHandler } from './application/command/update-project.handler';
import { GetAllProjectHandler } from './application/query/get-all-project.handler';
import { DeleteProjectHandler } from './application/command/delete-project.handler';
import { AddUserToProjectHandler } from './application/command/add-user-to-project.handler';
import { RemoveUserFromProjectHandler } from './application/command/remove-user-from-project.handler';
import { HistoryService } from 'src/history/history.service';
import { HistoryRepository } from 'src/history/history.repository';
import { ListsService } from './domain/list.service';
import { AuthService } from 'src/user/domain/auth.service';



export const ProjectRepoProvider: Provider[] = [{
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
  imports: [TypeOrmModule.forFeature([ProjectRepository, HistoryRepository]), UserRepository, CqrsModule],
  providers: [...ProjectRepoProvider, AuthService, ProjectsService, UsersService, ListsService, JwtService, HistoryService, CreateProjectHandler, UserCreatedHandler, GetOneProjectHandler, UpdateProjectHandler, GetAllProjectHandler, DeleteProjectHandler, AddUserToProjectHandler, RemoveUserFromProjectHandler],
  controllers: [ProjectsController],
  exports: [ProjectsService]
})
export class ProjectsModule { }
