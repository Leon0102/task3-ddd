/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDTO } from './dto/create-list.dto';
import { UpdateListDTO } from './dto/update-list.dto';
import { ListEntity } from './list.entity';
import { ProjectEntity } from 'src/project/domain/project.entity';
import { ListDeletedEvent } from './event/list-deleted.event';
import { EventBus } from '@nestjs/cqrs';
import { IListRepository } from './list.repository';
import { ListRepository } from '../infrastructure/repository/list.repository';

@Injectable()
export class ListsService {
    constructor(
        private readonly listRepository: ListRepository,
        private readonly eventBus: EventBus
    ) { }

    async create(createListDTO: CreateListDTO, project: ProjectEntity): Promise<ListEntity> {
        const list_save = new ListEntity();
        list_save.name = createListDTO.name;
        list_save.color = createListDTO.color;
        list_save.project = project;
        return this.listRepository.createOne(list_save);
    }

    async findListsByProjectId(projectId: number): Promise<ListEntity[]> {
        return this.listRepository.getListByProjectId(projectId);
    }

    async delete(id: number): Promise<any> {
        const list = await this.listRepository.getOne(id);
        if (!list) {
            throw new NotFoundException('List not found');
        }
        await this.listRepository.deleteOne(id);
        this.eventBus.publish(new ListDeletedEvent(list.id));
        return list;
    }
}
