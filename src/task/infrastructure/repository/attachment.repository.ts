/* eslint-disable prettier/prettier */
import { IAttachmentRepository } from 'src/task/domain/attachment/attachment.repository';
import { EntityRepository, Repository } from 'typeorm';

import { AttachmentEntity } from '../../domain/attachment/attachment.entity';

@EntityRepository(AttachmentEntity)
export class AttachmentRepository extends Repository<AttachmentEntity> implements IAttachmentRepository {

    async findAll(): Promise<AttachmentEntity[]> {
        return this.find();
    }
    async getOne(id: number): Promise<AttachmentEntity> {
        return this.findOne(id);
    }
    async checkExist(id: number): Promise<boolean> {
        return this.findOne(id) ? true : false;
    }
    async updateOne(id: number, entity: AttachmentEntity): Promise<any> {
        return this.update(id, entity);
    }
    async createOne(entity: AttachmentEntity): Promise<AttachmentEntity> {
        return this.save(entity);
    }
    async deleteOne(id: number): Promise<any> {
        return this.softDelete(id);
    }
}