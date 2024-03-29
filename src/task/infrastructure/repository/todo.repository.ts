/* eslint-disable prettier/prettier */
import { EntityRepository, getRepository, Repository } from 'typeorm';

import { TodoEntity } from 'src/task/domain/todo/todo.entity';
import { ITodoRepository } from 'src/task/domain/todo/todo.repository';

@EntityRepository(TodoEntity)
export class TodoRepository extends Repository<TodoEntity> implements ITodoRepository {
    async checkExist(id: number): Promise<boolean> {
        const exist = await this.getOne(id);
        return exist ? true : false;
    }

    async saveOne(entity: TodoEntity): Promise<TodoEntity> {
        return await getRepository(TodoEntity).save(entity);
    }

    async createOne(entity: TodoEntity): Promise<TodoEntity> {
        return await getRepository(TodoEntity).save(entity);
    }
    async findAll(): Promise<TodoEntity[]> {
        return await getRepository(TodoEntity).find();
    }

    async deleteOne(id: number): Promise<any> {
        return await getRepository(TodoEntity).softDelete(id);
    }

    async removeOne(todo: TodoEntity): Promise<any> {
        return await getRepository(TodoEntity).remove(todo);
    }

    async getOne(id: number): Promise<TodoEntity> {
        return await getRepository(TodoEntity).findOne(id);
    }
    async updateOne(id: number, entity: TodoEntity): Promise<any> {
        return await getRepository(TodoEntity).update(id, entity);
    }
}