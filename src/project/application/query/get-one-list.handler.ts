/* eslint-disable prettier/prettier */

import { Inject, NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ListEntity } from "src/project/domain/list.entity";
import { IListRepository } from "src/project/domain/list.repository";
import { IProjectRepository } from "src/project/domain/project.repository";
import { GetOneListQuery } from "./get-one-list.query";


@QueryHandler(GetOneListQuery)
export class GetOneListHandler implements IQueryHandler<GetOneListQuery> {
    constructor(
        @Inject('ListRepository')
        private readonly listRepository: IListRepository,
        @Inject('ProjectRepository')
        private readonly projectRepository: IProjectRepository,
    ) { }

    async execute(query: GetOneListQuery): Promise<ListEntity> {
        const list = await this.listRepository.getOne(query.id);
        if (!list) {
            throw new NotFoundException(`List with id ${query.id} not found`);
        }
        const project = await this.projectRepository.getOne(list.projectId);
        if (await this.projectRepository.checkProjectOfUser(project.id, query.userId)) {
            return list;
        }
        throw new NotFoundException('List not found');
    }
}
