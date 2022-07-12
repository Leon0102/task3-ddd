/* eslint-disable prettier/prettier */
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ProjectEntity } from "src/project/domain/project.entity";
import { ProjectsService } from "src/project/domain/projects.service";
import { ProjectRepository } from "src/project/infrastructure/repository/project.repository";
import { GetOneProjectQuery } from "./get-one-project.query";


@QueryHandler(GetOneProjectQuery)
export class GetOneProjectHandler implements IQueryHandler<GetOneProjectQuery> {
    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly projectsService: ProjectsService
    ) { }

    async execute(query: GetOneProjectQuery): Promise<ProjectEntity> {
        const project = await this.projectsService.findOneProject(query.getId(), query.getUserId());
        for (const user of project.users) {
            delete user.password;
            delete user.refreshToken;
            delete user.refreshtokenexpires;
        }
        return project;
    }
}
