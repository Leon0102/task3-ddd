/* eslint-disable prettier/prettier */
import { Inject, NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ProjectEntity } from "src/project/domain/project.entity";
import { IProjectRepository } from "src/project/domain/project.repository";
import { GetOneProjectQuery } from "./get-one-project.query";


@QueryHandler(GetOneProjectQuery)
export class GetOneProjectHandler implements IQueryHandler<GetOneProjectQuery> {
    constructor(
        @Inject('ProjectRepository')
        private readonly projectRepository: IProjectRepository,
    ) { }

    async execute(query: GetOneProjectQuery): Promise<ProjectEntity> {
        if (!await this.projectRepository.checkProjectOfUser(query.id, query.userId)) {
            throw new NotFoundException('Project not found');
        }
        const project = await this.projectRepository.getOne(query.id);
        return project;
    }
}
