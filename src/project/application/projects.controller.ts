/* eslint-disable prettier/prettier */
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Req, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/user/application/filter/http-exception.filter';
import { JwtAuthGuard } from 'src/user/application/guards/jwt-auth.guard';
import { UsersService } from 'src/user/domain/users.service';
import { CreateProjectDTO } from 'src/project/domain/dto/create-project.dto';
import { UpdateProjectDTO } from 'src/project/domain/dto/update-project.dto';
import { DeleteUserFromProjectDTO } from '../domain/dto/delete-user-from-project.dto';
import { ProjectsService } from 'src/project/domain/projects.service';
import { CreateListDTO } from 'src/project/domain/dto/create-list.dto';
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
import { CreateListCommand } from './command/create-list.command';
import { ListEntity } from '../domain/list.entity';
import { DeleteListCommand } from './command/delete-list.command';
import { UpdateListCommand } from './command/update-list.command';
import { UpdateListDTO } from '../domain/dto/update-list.dto';
import { GetOneListQuery } from './query/get-one-list.query';

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
    findOne(@Req() req: any, @Param('id', ParseIntPipe) id: number): Promise<ProjectEntity> {
        return this.queryBus.execute(new GetOneProjectQuery(id, req.user.id));
    }
    @Post()
    async createProject(@Req() req: any, @Body() createProject: CreateProjectDTO): Promise<ProjectEntity> {
        return await this.commandBus.execute(new CreateProjectCommand(createProject.name, createProject.description, req.user.id));
    }

    @Delete('/:id')
    async deleteProject(@Req() req: any, @Param('id', ParseIntPipe) id: number): Promise<any> {
        return await this.commandBus.execute(new DeleteProjectCommand(req.user.id, id));
    }

    @Patch('/:id')
    async updateProject(@Req() req: any, @Param('id', ParseIntPipe) id: number,
        @Body() updateProject: UpdateProjectDTO): Promise<any> {
        return await this.commandBus.execute(new UpdateProjectCommand(req.user.id, id, updateProject.name, updateProject.description));
    }

    @Patch('/:id/users')
    async addUserToProject(@Req() req: any, @Param('id', ParseIntPipe) id: number,
        @Body() addUserDTO: AddUserToProjectDTO): Promise<any> {
        return await this.commandBus.execute(new AddUserToProjectCommand(req.user.id, id, addUserDTO.userId));
    }

    @Delete('/:id/users')
    async removeUserFromProject(@Req() req: any, @Param('id', ParseIntPipe) id: number,
        @Body() deleteUserDTO: DeleteUserFromProjectDTO): Promise<any> {
        return await this.commandBus.execute(new RemoveUserFromProjectCommand(req.user.id, id, deleteUserDTO.userId));
    }

    @Get('/lists/:id')
    async getLists(@Req() req: any, @Param('id', ParseIntPipe) id: number): Promise<ListEntity[]> {
        return await this.queryBus.execute(new GetOneListQuery(id, req.user.id));
    }

    @Post('/:id/lists')
    async create(@Req() req: any, @Param('id', ParseIntPipe) projectId: number, @Body() createListDTO: CreateListDTO): Promise<ListEntity> {
        return await this.commandBus.execute(new CreateListCommand(req.user.id, createListDTO.name, createListDTO.color, projectId));
    }

    @Delete('/lists/:id')
    async delete(@Req() req: any, @Param('id', ParseIntPipe) id: number): Promise<any> {
        return await this.commandBus.execute(new DeleteListCommand(req.user.id, id));
    }

    @Patch('/lists/:id')
    async update(@Req() req: any, @Param('id', ParseIntPipe) id: number, @Body() updateListDTO: UpdateListDTO): Promise<ListEntity> {
        return await this.commandBus.execute(new UpdateListCommand(req.user.id, id, updateListDTO.name, updateListDTO.color));
    }


}
