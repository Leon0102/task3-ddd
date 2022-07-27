/* eslint-disable prettier/prettier */

import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { HistoryService } from "src/history/history.service";
import { AttachmentEntity } from "src/task/domain/attachment/attachment.entity";
import { IAttachmentRepository } from "src/task/domain/attachment/attachment.repository";
import { DeleteAttachmentCommand } from "./delete-attachment.command";

@CommandHandler(DeleteAttachmentCommand)
export class DeleteAttachmentHandler implements ICommandHandler<DeleteAttachmentCommand> {
    constructor(
        @Inject('AttachmentRepository')
        private readonly attachmentRepository: IAttachmentRepository,
        private readonly historyService: HistoryService,
    ) { }

    async execute(command: DeleteAttachmentCommand) {
        const attachment = await this.attachmentRepository.deleteOne(command.id);
        await this.historyService.createHistory("delete", "attachment", JSON.stringify(attachment), command.userId, "ATTACHMENT", attachment.id);
        return attachment;
    }
}
