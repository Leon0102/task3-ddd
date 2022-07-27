/* eslint-disable prettier/prettier */
import { IAttachmentRepository } from 'src/task/domain/attachment/attachment.repository';
import { EntityRepository, getRepository, Repository } from 'typeorm';

import { AttachmentEntity } from '../../domain/attachment/attachment.entity';

@EntityRepository(AttachmentEntity)
export class AttachmentRepository extends Repository<AttachmentEntity> implements IAttachmentRepository {

    async findAll(): Promise<AttachmentEntity[]> {
        return getRepository(AttachmentEntity).find();
    }
    async getOne(id: number): Promise<AttachmentEntity> {
        return getRepository(AttachmentEntity).findOne(id);
    }
    async checkExist(id: number): Promise<boolean> {
        return getRepository(AttachmentEntity).findOne(id) ? true : false;
    }
    async updateOne(id: number, entity: AttachmentEntity): Promise<any> {
        return getRepository(AttachmentEntity).update(id, entity);
    }
    async createOne(entity: AttachmentEntity): Promise<AttachmentEntity> {
        return getRepository(AttachmentEntity).save(entity);
    }
    async deleteOne(id: number): Promise<any> {
        return getRepository(AttachmentEntity).softDelete(id);
    }

    async saveOne(entity: AttachmentEntity): Promise<AttachmentEntity> {
        return await getRepository(AttachmentEntity).save(entity);
    }
}