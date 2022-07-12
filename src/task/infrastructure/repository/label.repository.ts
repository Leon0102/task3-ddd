/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';

import { LabelEntity } from '../../domain/label/label.entity';

@EntityRepository(LabelEntity)
export class LabelRepository extends Repository<LabelEntity> {
    async checkExist(label: LabelEntity): Promise<boolean> {
        const exist = await this.findOne({ title: label.title });
        return exist ? true : false;
    }

    async createOne(label: LabelEntity): Promise<LabelEntity> {
        return await this.save(label);
    }

    async getLabelsOfTask(taskId: number): Promise<LabelEntity[]> {
        return await this.createQueryBuilder('label')
            .leftJoinAndSelect('label.tasks', 'task')
            .where('task.id = :taskId', { taskId })
            .getMany();
    }
}