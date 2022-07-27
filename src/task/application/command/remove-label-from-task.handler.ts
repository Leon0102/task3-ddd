/* eslint-disable prettier/prettier */
import { Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { HistoryService } from "src/history/history.service";
import { TaskEntity } from "src/task/domain/task/task.entity";
import { ITaskRepository } from "src/task/domain/task/task.repository";
import { TasksService } from "src/task/domain/task/tasks.service";
import { RemoveLabelFromTaskCommand } from "./remove-label-from-task.command";

@CommandHandler(RemoveLabelFromTaskCommand)
export class RemoveLabelFromTaskHandler implements ICommandHandler<RemoveLabelFromTaskCommand> {
    constructor(
        @Inject('TaskRepository')
        private readonly taskRepository: ITaskRepository,
        private readonly historyService: HistoryService,
        private readonly taskService: TasksService,
    ) { }

    async execute(command: RemoveLabelFromTaskCommand) {
        if (!await this.taskRepository.CheckLabelOfTask(command.taskId, command.labelId)) {
            throw new NotFoundException('Label not assigned to task');
        }
        if (! await this.taskService.checkTaskOfUser(command.userId, command.taskId)) {
            throw new NotFoundException('Task not found');
        }
        const task = await this.taskRepository.getOne(command.taskId);
        task.labels = task.labels.filter(label => label.id !== command.labelId);
        await this.historyService.createHistory("remove", "label", JSON.stringify(task), command.userId, "TASK", task.id);
        await this.taskRepository.saveOne(task);
    }
}
