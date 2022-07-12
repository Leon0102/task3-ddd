/* eslint-disable prettier/prettier */

import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ProjectEntity } from "src/project/domain/project.entity";
import { ProjectsService } from "src/project/domain/projects.service";
import { ProjectRepository } from "src/project/infrastructure/repository/project.repository";
import { GetAllProjectQuery } from "./get-all-project.query";




@QueryHandler(GetAllProjectQuery)
export class GetAllProjectHandler implements IQueryHandler<GetAllProjectQuery> {
    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly projectsService: ProjectsService
    ) { }

    async execute(query: GetAllProjectQuery): Promise<ProjectEntity[]> {
        const projects = await this.projectsService.findProjectsByUserId(query.getUserId());
        return projects;
    }
}
