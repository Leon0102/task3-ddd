/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { TaskEntity } from 'src/task/domain/task/task.entity';
import { ITaskRepository } from 'src/task/domain/task/task.repository';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> implements ITaskRepository {
    async checkExist(id: number): Promise<boolean> {
        const exist = await this.findOne(id);
        return exist ? true : false;
    }

    async findOneByName(name: string): Promise<TaskEntity> {
        return await this.findOne({ name });
    }

    async deleteOne(id: number): Promise<any> {
        return await this.softDelete(id);
    }

    async getOne(id: number): Promise<TaskEntity> {
        return await this.createQueryBuilder('task')
            .leftJoinAndSelect('task.labels', 'label')
            .leftJoinAndSelect('task.attachments', 'attachment')
            .leftJoinAndSelect('task.todos', 'todo')
            .where('task.id = :id', { id })
            .getOne();
    }

    async findAll(): Promise<TaskEntity[]> {
        return await this.find();
    }

    async updateOne(id: number, entity: TaskEntity): Promise<any> {
        return await this.update(id, entity);
    }

    async getLabelsOfTask(taskId: number): Promise<TaskEntity> {
        return await this.createQueryBuilder('task')
            .leftJoinAndSelect('task.labels', 'label')
            .where('task.id = :taskId', { taskId })
            .getOne();
    }

    async deleteLabelsByTaskId(taskId: number): Promise<TaskEntity> {
        const label = await this.createQueryBuilder('task')
            .leftJoinAndSelect('task.labels', 'label')
            .where('task.id = :taskId', { taskId })
            .getOne();
        return await this.remove(label);
    }

    async findTasksOnList(listId: number): Promise<TaskEntity[]> {
        return await this.createQueryBuilder('task')
            .leftJoinAndSelect('task.labels', 'label')
            .where('task.listId = :listId', { listId })
            .getMany();
    }

    async findTasksByListId(listId: number): Promise<TaskEntity[]> {
        return await this.createQueryBuilder('task')
            .where('task.listId = :listId', { listId })
            .getMany();
    }
}