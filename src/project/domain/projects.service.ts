/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectEntity } from './project.entity';
import { IProjectRepository } from './project.repository';

@Injectable()
export class ProjectsService {
    constructor(
        @Inject('ProjectRepository')
        private readonly projectRepository: IProjectRepository,
    ) { }

    async findProjectsByUserId(userId: number): Promise<ProjectEntity[] | any> {
        return this.projectRepository.getProjectsOfUser(userId)
    }
}
