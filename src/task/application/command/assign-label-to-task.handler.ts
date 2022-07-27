/* eslint-disable prettier/prettier */
import { BadRequestException, Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { HistoryService } from "src/history/history.service";
import { ILabelRepository } from "src/task/domain/label/label.repository";
import { TaskEntity } from "src/task/domain/task/task.entity";
import { ITaskRepository } from "src/task/domain/task/task.repository";
import { TasksService } from "src/task/domain/task/tasks.service";
import { AssignLabelToTaskCommand } from "./assign-label-to-task.command";

@CommandHandler(AssignLabelToTaskCommand)
export class AssignLabelToTaskHandler implements ICommandHandler<AssignLabelToTaskCommand> {
    constructor(
        @Inject('TaskRepository')
        private readonly taskRepository: ITaskRepository,
        @Inject('LabelRepository')
        private readonly labelRepository: ILabelRepository,
        private readonly historyService: HistoryService,
        private readonly taskService: TasksService,
    ) { }

    async execute(command: AssignLabelToTaskCommand) {
        if (await this.taskRepository.CheckLabelOfTask(command.taskId, command.labelId)) {
            throw new BadRequestException('Label already assigned to task');
        }
        const task = await this.taskRepository.getOne(command.taskId);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        if (!await this.taskService.checkTaskOfUser(command.userCreatedById, task.id)) {
            throw new NotFoundException('Task not found');
        }
        const label = await this.labelRepository.getOne(command.labelId);
        await task.assignLabel(label);
        await this.taskRepository.saveOne(task);
        await this.historyService.createHistory('Update', `Assign Label ${label.id} to Task ${task.id}`, JSON.stringify(task), command.userCreatedById, 'TASK', task.id);
    }
}
