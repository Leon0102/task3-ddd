/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';

import { TodoEntity } from 'src/task/domain/todo/todo.entity';
import { ITodoRepository } from 'src/task/domain/todo/todo.repository';

@EntityRepository(TodoEntity)
export class TodoRepository extends Repository<TodoEntity> implements ITodoRepository {
    async checkExist(id: number): Promise<boolean> {
        const exist = await this.getOne(id);
        return exist ? true : false;
    }

    async createOne(entity: TodoEntity): Promise<TodoEntity> {
        return await this.save(entity);
    }
    async findAll(): Promise<TodoEntity[]> {
        return await this.find();
    }

    async deleteOne(id: number): Promise<any> {
        return await this.softDelete(id);
    }

    async removeOne(todo: TodoEntity): Promise<any> {
        return await this.remove(todo);
    }

    async getOne(id: number): Promise<TodoEntity> {
        return await this.findOne(id);
    }
    async updateOne(id: number, entity: TodoEntity): Promise<any> {
        return await this.update(id, entity);
    }
}