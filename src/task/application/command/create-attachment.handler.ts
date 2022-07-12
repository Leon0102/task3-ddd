/* eslint-disable prettier/prettier */

import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AttachmentEntity } from "src/task/domain/attachment/attachment.entity";
import { IAttachmentRepository } from "src/task/domain/attachment/attachment.repository";
import { CreateAttachmentCommand } from "./create-attachment.command";


@CommandHandler(CreateAttachmentCommand)
export class CreateAttachmentHandler implements ICommandHandler<CreateAttachmentCommand> {
    constructor(
        private readonly attachmentRepository: IAttachmentRepository,
    ) { }

    async execute(command: CreateAttachmentCommand): Promise<AttachmentEntity> {
        const attachment = new AttachmentEntity();
        attachment.storageURL = command.filePath;
        attachment.taskId = command.taskId;
        attachment.fileName = command.fileName;
        return this.attachmentRepository.createOne(attachment);
    }
}