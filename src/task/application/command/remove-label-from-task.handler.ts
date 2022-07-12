/* eslint-disable prettier/prettier */
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { TaskEntity } from "src/task/domain/task/task.entity";
import { ITaskRepository } from "src/task/domain/task/task.repository";
import { RemoveLabelFromTaskCommand } from "./remove-label-from-task.command";

@CommandHandler(RemoveLabelFromTaskCommand)
export class RemoveLabelFromTaskHandler implements ICommandHandler<RemoveLabelFromTaskCommand> {
    constructor(
        private readonly taskRepository: ITaskRepository,
    ) { }

    async execute(command: RemoveLabelFromTaskCommand): Promise<TaskEntity> {
        const task = await this.taskRepository.getOne(command.taskId);
        task.labels = task.labels.filter(label => label.id !== command.labelId);
        return await this.taskRepository.save(task);

    }
}
