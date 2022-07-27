/* eslint-disable prettier/prettier */
import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { HistoryService } from "src/history/history.service";
import { LabelEntity } from "src/task/domain/label/label.entity";
import { ILabelRepository } from "src/task/domain/label/label.repository";
import { CreateLabelCommand } from "./create-label.command";



@CommandHandler(CreateLabelCommand)
export class CreateLabelHandler implements ICommandHandler<CreateLabelCommand> {
    constructor(
        @Inject('LabelRepository')
        private readonly labelRepository: ILabelRepository,
        private readonly historyService: HistoryService,
    ) { }

    async execute(command: CreateLabelCommand) {
        const newLabel = new LabelEntity();
        newLabel.title = command.title;
        newLabel.color = command.color;
        await this.labelRepository.createOne(newLabel);
        await this.historyService.createHistory("create", "label", JSON.stringify(newLabel), command.userId, "LABEL", newLabel.id);
        return newLabel;
    }
}
