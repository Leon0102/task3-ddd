/* eslint-disable prettier/prettier */
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LabelEntity } from "src/task/domain/label/label.entity";
import { ILabelRepository } from "src/task/domain/label/label.repository";
import { ITaskRepository } from "src/task/domain/task/task.repository";
import { CreateLabelCommand } from "./create-label.command";



@CommandHandler(CreateLabelCommand)
export class CreateLabelHandler implements ICommandHandler<CreateLabelCommand> {
    constructor(
        private readonly labelRepository: ILabelRepository,
        private readonly taskRepository: ITaskRepository,
    ) { }

    async execute(command: CreateLabelCommand): Promise<LabelEntity> {
        const task = await this.taskRepository.getOne(command.taskId);
        const labels = await this.labelRepository.getLabelsOfTask(command.taskId);
        const newLabel = new LabelEntity();
        newLabel.title = command.title;
        newLabel.color = command.color;
        await this.labelRepository.createOne(newLabel);
        task.labels = [...labels, newLabel];
        await this.taskRepository.save(task);
        return newLabel;
    }
}
