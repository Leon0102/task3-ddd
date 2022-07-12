/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AttachmentEntity } from './attachment.entity';
import { IAttachmentRepository } from './attachment.repository';

@Injectable()
export class AttachmentsService {
    constructor(
        private readonly attachmentRepository: IAttachmentRepository,
    ) { }

}
