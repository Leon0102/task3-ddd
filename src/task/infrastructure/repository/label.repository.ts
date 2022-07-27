/* eslint-disable prettier/prettier */
import { EntityRepository, getRepository, Repository } from 'typeorm';

import { LabelEntity } from '../../domain/label/label.entity';

@EntityRepository(LabelEntity)
export class LabelRepository extends Repository<LabelEntity> {
    async checkExist(label: LabelEntity): Promise<boolean> {
        const exist = await getRepository(LabelEntity).findOne({ title: label.title });
        return exist ? true : false;
    }

    async getOne(id: number): Promise<LabelEntity> {
        return await getRepository(LabelEntity).findOne(id);
    }

    async createOne(label: LabelEntity): Promise<LabelEntity> {
        return await getRepository(LabelEntity).save(label);
    }

    async getLabelsOfTask(taskId: number): Promise<LabelEntity[]> {
        return await getRepository(LabelEntity).createQueryBuilder('label')
            .leftJoinAndSelect('label.tasks', 'task')
            .where('task.id = :taskId', { taskId })
            .getMany();
    }
}