/* eslint-disable prettier/prettier */

import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AttachmentEntity } from "src/task/domain/attachment/attachment.entity";
import { IAttachmentRepository } from "src/task/domain/attachment/attachment.repository";
import { DeleteAttachmentCommand } from "./delete-attachment.command";

@CommandHandler(DeleteAttachmentCommand)
export class DeleteAttachmentHandler implements ICommandHandler<DeleteAttachmentCommand> {
    constructor(
        private readonly attachmentRepository: IAttachmentRepository,
    ) { }

    async execute(command: DeleteAttachmentCommand): Promise<AttachmentEntity> {
        return await this.attachmentRepository.deleteOne(command.id);
    }
}
