/* eslint-disable prettier/prettier */

import { Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { HistoryService } from "src/history/history.service";
import { AttachmentEntity } from "src/task/domain/attachment/attachment.entity";
import { IAttachmentRepository } from "src/task/domain/attachment/attachment.repository";
import { TasksService } from "src/task/domain/task/tasks.service";
import { CreateAttachmentCommand } from "./create-attachment.command";


@CommandHandler(CreateAttachmentCommand)
export class CreateAttachmentHandler implements ICommandHandler<CreateAttachmentCommand> {
    constructor(
        @Inject('AttachmentRepository')
        private readonly attachmentRepository: IAttachmentRepository,
        private readonly historyService: HistoryService,
        private readonly taskService: TasksService,
    ) { }

    async execute(command: CreateAttachmentCommand) {
        if (! await this.taskService.checkTaskOfUser(command.userId, command.taskId)) {
            throw new NotFoundException('Task not found');
        }
        const attachment = new AttachmentEntity();
        attachment.storageURL = command.filePath;
        attachment.taskId = command.taskId;
        attachment.fileName = command.fileName;
        await this.historyService.createHistory("create", "attachment", JSON.stringify(attachment), command.userId, "ATTACHMENT", attachment.id);
        await this.attachmentRepository.createOne(attachment);
        return attachment;
    }
}