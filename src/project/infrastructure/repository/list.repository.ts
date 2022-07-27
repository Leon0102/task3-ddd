/* eslint-disable prettier/prettier */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { ListEntity } from 'src/project/domain/list.entity';
import { IListRepository } from 'src/project/domain/list.repository';

@EntityRepository(ListEntity)
export class ListRepository extends Repository<ListEntity> implements IListRepository {
    async checkExist(id: number): Promise<boolean> {
        const exist = await getRepository(ListEntity).findOne(id);
        return exist ? true : false;
    }

    async saveOne(entity: ListEntity): Promise<ListEntity> {
        return await getRepository(ListEntity).save(entity);
    }
    async findAll(): Promise<ListEntity[]> {
        return await getRepository(ListEntity).find();
    }
    async deleteOne(id: number): Promise<any> {
        return await getRepository(ListEntity).softDelete(id);
    }
    async createOne(entity: ListEntity): Promise<ListEntity> {
        return await getRepository(ListEntity).save(entity);
    }

    async updateOne(id: number, entity: ListEntity): Promise<any> {
        return await getRepository(ListEntity).update(id, entity);
    }

    async getListByProjectId(projectId: number): Promise<ListEntity[]> {
        return await getRepository(ListEntity).createQueryBuilder('list')
            .where('list.projectId = :projectId', { projectId: projectId })
            .getMany();
    }

    async findOneList(id: number): Promise<ListEntity | null> {
        return await getRepository(ListEntity).findOne(id);
    }


    async getOne(id: number): Promise<ListEntity | null> {
        return await getRepository(ListEntity).createQueryBuilder('list')
            .leftJoinAndSelect('list.tasks', 'task')
            .where('list.id = :id', { id })
            .getOne();
    }

    async getListOfTask(taskId: number): Promise<ListEntity> {
        return await getRepository(ListEntity).createQueryBuilder('list')
            .leftJoinAndSelect('list.tasks', 'task')
            .where('task.id = :taskId', { taskId })
            .getOne();
    }

    async checkListOfUser(userId: number, listId: number): Promise<boolean> {
        const list = await getRepository(ListEntity).createQueryBuilder('list')
            .leftJoin('list.project', 'project')
            .leftJoin('project.users', 'user')
            .where('list.id = :listId', { listId })
            .andWhere('user.id = :userId', { userId })
            .getOne();
        return !!list;
    }
}