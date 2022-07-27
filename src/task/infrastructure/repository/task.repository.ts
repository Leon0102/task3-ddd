/* eslint-disable prettier/prettier */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { TaskEntity } from 'src/task/domain/task/task.entity';
import { ITaskRepository } from 'src/task/domain/task/task.repository';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> implements ITaskRepository {
    async checkExist(id: number): Promise<boolean> {
        const exist = await getRepository(TaskEntity).findOne(id);
        return exist ? true : false;
    }
    async deleteOne(id: number): Promise<any> {
        return await getRepository(TaskEntity).softDelete(id);
    }

    async saveOne(entity: TaskEntity): Promise<TaskEntity> {
        return await getRepository(TaskEntity).save(entity);
    }

    async getTaskAndUsers(taskId: number): Promise<TaskEntity> {
        return await getRepository(TaskEntity).createQueryBuilder('task')
            .leftJoinAndSelect('task.users', 'user')
            .leftJoinAndSelect('task.labels', 'label')
            .leftJoinAndSelect('task.attachments', 'attachment')
            .leftJoinAndSelect('task.todos', 'todo')
            .where('task.id = :taskId', { taskId })
            .getOne();
    }

    async findOneTaskById(taskId: number): Promise<TaskEntity> {
        return await getRepository(TaskEntity).createQueryBuilder('task')
            .where('task.id = :taskId', { taskId })
            .getOne();
    }

    async getOne(id: number): Promise<TaskEntity> {
        return await getRepository(TaskEntity).createQueryBuilder('task')
            .leftJoinAndSelect('task.labels', 'label')
            .leftJoinAndSelect('task.attachments', 'attachment')
            .leftJoinAndSelect('task.todos', 'todo')
            .where('task.id = :id', { id })
            .getOne();
    }

    async findAll(): Promise<TaskEntity[]> {
        return await getRepository(TaskEntity).find();
    }

    async updateOne(id: number, entity: TaskEntity): Promise<any> {
        return await getRepository(TaskEntity).update(id, entity);
    }

    async getLabelsOfTask(taskId: number): Promise<TaskEntity> {
        return await getRepository(TaskEntity).createQueryBuilder('task')
            .leftJoinAndSelect('task.labels', 'label')
            .where('task.id = :taskId', { taskId })
            .getOne();
    }

    async deleteLabelsByTaskId(taskId: number): Promise<TaskEntity> {
        const label = await getRepository(TaskEntity).createQueryBuilder('task')
            .leftJoinAndSelect('task.labels', 'label')
            .where('task.id = :taskId', { taskId })
            .getOne();
        return await getRepository(TaskEntity).remove(label);
    }

    async findTasksByListId(listId: number): Promise<TaskEntity[]> {
        return await getRepository(TaskEntity).createQueryBuilder('task')
            .where('task.listId = :listId', { listId })
            .getMany();
    }

    async checkTaskOfUser(taskId: number, userId: number): Promise<boolean> {
        const task = await getRepository(TaskEntity).createQueryBuilder('task')
            .leftJoinAndSelect('task.list', 'list')
            .leftJoinAndSelect('list.project', 'project')
            .leftJoinAndSelect('project.users', 'user')
            .where('task.id = :taskId', { taskId })
            .andWhere('user.id = :userId', { userId })
            .getOne();
        return task ? true : false;
    }

    async CheckLabelOfTask(taskId: number, labelId: number): Promise<boolean> {
        const task = await getRepository(TaskEntity).createQueryBuilder('task')
            .leftJoinAndSelect('task.labels', 'label')
            .where('task.id = :taskId', { taskId })
            .andWhere('label.id = :labelId', { labelId })
            .getOne();
        return task ? true : false;
    }
}