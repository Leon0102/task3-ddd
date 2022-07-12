/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { IGenericRepository } from "src/base/igeneric.repository";
import { AttachmentEntity } from "./attachment.entity";

export interface IAttachmentRepository extends IGenericRepository<AttachmentEntity> {
    checkExist(id: number): Promise<boolean>;
    createOne(entity: AttachmentEntity): Promise<AttachmentEntity>;
}