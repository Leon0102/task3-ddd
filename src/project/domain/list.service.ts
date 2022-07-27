/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ListEntity } from './list.entity';
import { ProjectEntity } from 'src/project/domain/project.entity';
import { EventBus } from '@nestjs/cqrs';
import { IListRepository } from './list.repository';
import { HistoryService } from 'src/history/history.service';

@Injectable()
export class ListsService {
    constructor(
        @Inject('ListRepository')
        private readonly listRepository: IListRepository,
        private readonly historyService: HistoryService,
    ) { }

    async create(userId: number, name, color, project: ProjectEntity): Promise<ListEntity> {
        const list_save = new ListEntity(name, color, project, project.id);
        const list = await this.listRepository.createOne(list_save);
        await this.historyService.createHistory("create", "list", JSON.stringify(list_save), userId, "LIST", list_save.id);
        return list;
    }
}
