/* eslint-disable prettier/prettier */

import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ListEntity } from "src/list/domain/list.entity";
import { ListsService } from "src/list/domain/list.service";
import { ListRepository } from "src/list/infrastructure/repository/list.repository";
import { ProjectRepository } from "src/project/infrastructure/repository/project.repository";
import { GetOneListQuery } from "./get-one-list.query";


@QueryHandler(GetOneListQuery)
export class GetOneListHandler implements IQueryHandler<GetOneListQuery> {
    constructor(
        private readonly listRepository: ListRepository,
        private readonly projectRepository: ProjectRepository,
    ) { }

    async execute(query: GetOneListQuery): Promise<ListEntity> {
        const list = await this.listRepository.getOne(query.getId());
        if (!list) {
            throw new NotFoundException(`List with id ${query.getId()} not found`);
        }
        const project = await this.projectRepository.getOne(list.projectId);
        if (await this.projectRepository.checkProjectOfUser(project.id, query.getUserId())) {
            return list;
        }
        throw new NotFoundException('List not found');
    }
}
