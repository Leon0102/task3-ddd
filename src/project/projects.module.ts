/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProjectsService } from 'src/project/domain/projects.service';
import { ProjectsController } from 'src/project/application/projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRepository } from './infrastructure/repository/project.repository';
import { ListRepository } from '../list/infrastructure/repository/list.repository';
import { UsersService } from 'src/user/domain/users.service';
import { UserRepository } from '../user/infrastructure/repository/user.repository';
import { AuthService } from 'src/user/domain/auth.service';
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

@Module({
  imports: [TypeOrmModule.forFeature([ProjectRepository, ListRepository, UserRepository]), UserRepository, CqrsModule],
  providers: [Object, ProjectsService, UsersService, AuthService, JwtService, CreateProjectHandler, UserCreatedHandler, GetOneProjectHandler, UpdateProjectHandler, GetAllProjectHandler, DeleteProjectHandler, AddUserToProjectHandler, RemoveUserFromProjectHandler],
  controllers: [ProjectsController],
  exports: [ProjectsService]
})
export class ProjectsModule { }
