/* eslint-disable prettier/prettier */

import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ProjectEntity } from "src/project/domain/project.entity";
import { ProjectsService } from "src/project/domain/projects.service";
import { GetAllProjectQuery } from "./get-all-project.query";

@QueryHandler(GetAllProjectQuery)
export class GetAllProjectHandler implements IQueryHandler<GetAllProjectQuery> {
    constructor(
        private readonly projectsService: ProjectsService
    ) { }

    async execute(query: GetAllProjectQuery): Promise<ProjectEntity[]> {
        const projects = await this.projectsService.findProjectsByUserId(query.userId);
        for (const project of projects) {
            delete project.__users__;
            delete project.__has_users__;
        }
        return projects;
    }
}
