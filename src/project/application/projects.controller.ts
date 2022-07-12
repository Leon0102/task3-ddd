/* eslint-disable prettier/prettier */
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Req, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/user/application/filter/http-exception.filter';
import { JwtAuthGuard } from 'src/user/application/guards/jwt-auth.guard';
import { UsersService } from 'src/user/domain/users.service';
import { CreateProjectDTO } from 'src/project/domain/dto/create-project.dto';
import { UpdateProjectDTO } from 'src/project/domain/dto/update-project.dto';
import { DeleteUserFromProjectDTO } from '../domain/dto/delete-user-from-project.dto';
import { Project } from 'src/project/domain/project.aggregate';
import { ProjectsService } from 'src/project/domain/projects.service';
import { CreateListDTO } from 'src/list/domain/dto/create-list.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProjectCommand } from './command/create-project.command';
import { GetOneProjectQuery } from './query/get-one-project.query';
import { ProjectRepository } from '../infrastructure/repository/project.repository';
import { UpdateProjectCommand } from './command/update-project.command';
import { TransformInterceptor } from 'src/interceptor/transform.interceptor';
import { GetAllProjectQuery } from './query/get-all-project.query';
import { ProjectEntity } from '../domain/project.entity';
import { DeleteProjectCommand } from './command/delete-project.command';
import { AddUserToProjectDTO } from '../domain/dto/add-user-project.dto';
import { AddUserToProjectCommand } from './command/add-user-to-project.command';
import { RemoveUserFromProjectCommand } from './command/remove-user-from-project.command';

@Controller('projects')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
// @UseFilters(new HttpExceptionFilter())
@UsePipes(new ValidationPipe({ transform: true }))
export class ProjectsController {
    private REF_TYPE = 'PROJECT';
    constructor(
        private readonly projectsService: ProjectsService,
        private readonly projectRepository: ProjectRepository,
        private readonly userService: UsersService,
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Get()
    async getProjectsOfUser(@Req() req: any): Promise<ProjectEntity[]> {
        return this.queryBus.execute(new GetAllProjectQuery(req.user.id));
    }

    @Get('/:id')
    findOne(@Req() req: any, @Param('id', ParseIntPipe) id: number): Promise<Project> {
        return this.queryBus.execute(new GetOneProjectQuery(id, req.user.id));
    }
    @Post()
    async createProject(@Req() req: any, @Body() createProject: CreateProjectDTO): Promise<Project> {
        return await this.commandBus.execute(new CreateProjectCommand(createProject.name, createProject.description, req.user.id));
    }

    @Delete('/:id')
    async deleteProject(@Req() req: any, @Param('id', ParseIntPipe) id: number): Promise<any> {
        return await this.commandBus.execute(new DeleteProjectCommand(id));
    }

    @Patch('/:id')
    async updateProject(@Req() req: any, @Param('id', ParseIntPipe) id: number,
        @Body() updateProject: UpdateProjectDTO): Promise<any> {
        return await this.commandBus.execute(new UpdateProjectCommand(id, updateProject.name, updateProject.description));
    }

    @Patch('/:id/users')
    async addUserToProject(@Req() req: any, @Param('id', ParseIntPipe) id: number,
        @Body() addUserDTO: AddUserToProjectDTO): Promise<any> {
        return await this.commandBus.execute(new AddUserToProjectCommand(id, addUserDTO.userId));
    }

    @Delete('/:id/users')
    async removeUserFromProject(@Req() req: any, @Param('id', ParseIntPipe) id: number,
        @Body() deleteUserDTO: DeleteUserFromProjectDTO): Promise<any> {
        return await this.commandBus.execute(new RemoveUserFromProjectCommand(id, deleteUserDTO.userId));
    }

}
