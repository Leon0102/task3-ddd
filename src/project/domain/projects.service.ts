/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../user/domain/user.aggregate';
import { CreateProjectDTO } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project.dto';
import { ProjectEntity } from './project.entity';
import { EventBus } from '@nestjs/cqrs';
import { ProjectCreatedEvent } from './event/project-createad.event';
import { UserEntity } from 'src/user/domain/entity/user.entity';
import { ProjectDeletedEvent } from './event/project-deleted.event';
import { IUserRepository } from 'src/user/domain/user.repository';
import { IProjectRepository } from './project.repository';
import { ProjectRepository } from '../infrastructure/repository/project.repository';
import { UserRepository } from 'src/user/infrastructure/repository/user.repository';

@Injectable()
export class ProjectsService {
    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly userRepository: UserRepository,
        private readonly eventBus: EventBus
    ) { }

    async findAll(): Promise<ProjectEntity[]> {
        return this.projectRepository.findAll();
    }

    async create(project: CreateProjectDTO, user: UserEntity): Promise<ProjectEntity> {
        const project_save = new ProjectEntity();
        project_save.name = project.name;
        project_save.description = project.description;
        project_save.users = [user];
        await this.projectRepository.createOne(project_save);
        this.eventBus.publish(new ProjectCreatedEvent(project_save.id));
        return project_save;
    }

    async findOneById(id: number): Promise<ProjectEntity> {
        const project = await this.projectRepository.getOne(id);
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        return project;
    }

    async findByName(name: string): Promise<ProjectEntity> {
        return this.projectRepository.findByName(name);
    }

    async update(id: number, project: UpdateProjectDTO): Promise<ProjectEntity> {
        const currentProject = await this.projectRepository.getOne(id);
        if (!currentProject) {
            throw new NotFoundException('Project not found');
        }
        currentProject.name = project.name;
        currentProject.description = project.description;
        return this.projectRepository.updateOne(id, currentProject);
    }

    async deleteProject(id: number): Promise<any> {
        const project = await this.projectRepository.getOne(id);
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        await this.projectRepository.deleteOne(id);
        this.eventBus.publish(new ProjectDeletedEvent(project.id));
        return project;
    }

    async findOneProject(id: number, userId: number): Promise<any> {
        const project = await this.projectRepository.checkProjectOfUser(id, userId);
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        else {
            const currProject = await this.projectRepository.getOne(id);
            return currProject;
        }
    }

    async findProjectsByUserId(userId: number): Promise<ProjectEntity[] | any> {
        const project = await this.projectRepository.getProjectsOfUser(userId)
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        project.forEach(async (project) => {
            delete project.users;
        });
        return project;
    }

    async updateProject(id: number, name: string, description: string): Promise<any> {
        const currentProject = await this.projectRepository.getOne(id);
        const usersOfProject = await this.userRepository.getUsersOfProjects(id);
        if (!currentProject) {
            throw new NotFoundException('Project not found');
        }
        currentProject.name = name;
        currentProject.description = description;
        currentProject.users = [...usersOfProject];
        await this.projectRepository.save(currentProject);
        currentProject.users = currentProject.users.filter((user) => {
            delete user.projects;
            delete user.password;
            delete user.refreshToken;
            delete user.refreshtokenexpires;
            return user;
        })
        return currentProject;
    }

    async deleteUserFromProject(projectId: number, userId: number): Promise<any> {
        const project = await this.projectRepository.getOne(projectId);
        const usersOfProject = await this.userRepository.getUsersOfProjects(projectId);
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        project.users = usersOfProject.filter(user => user.id !== userId);
        await this.projectRepository.save(project);
        return project.users.filter((user) => {
            delete user.projects;
            delete user.password;
            delete user.refreshToken;
            delete user.refreshtokenexpires;
            return user;
        })
    }

}
