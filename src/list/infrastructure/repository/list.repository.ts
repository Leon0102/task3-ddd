/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { ListEntity } from 'src/list/domain/list.entity';
import { IListRepository } from 'src/list/domain/list.repository';

@EntityRepository(ListEntity)
export class ListRepository extends Repository<ListEntity> implements IListRepository {
    async checkExist(id: number): Promise<boolean> {
        const exist = await this.findOne(id);
        return exist ? true : false;
    }

    async findAll(): Promise<ListEntity[]> {
        return await this.find();
    }
    async deleteOne(id: number): Promise<any> {
        return await this.softDelete(id);
    }
    async createOne(entity: ListEntity): Promise<ListEntity> {
        return await this.save(entity);
    }

    async updateOne(id: number, entity: ListEntity): Promise<any> {
        return await this.update(id, entity);
    }

    async getListByProjectId(projectId: number): Promise<ListEntity[]> {
        return await this.createQueryBuilder('list')
            .where('list.projectId = :projectId', { projectId: projectId })
            .getMany();
    }

    async getListAndTasks(listId: number): Promise<ListEntity> {
        return await this.createQueryBuilder('list')
            .leftJoinAndSelect('list.todos', 'todo')
            .where('list.id = :listId', { listId })
            .getOne();
    }

    async getOne(id: number): Promise<ListEntity | null> {
        return await this.createQueryBuilder('list')
            .leftJoinAndSelect('list.tasks', 'task')
            .where('list.id = :id', { id })
            .getOne();
    }
}