/* eslint-disable prettier/prettier */

import { Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { HistoryService } from "src/history/history.service";
import { TaskEntity } from "src/task/domain/task/task.entity";
import { ITaskRepository } from "src/task/domain/task/task.repository";
import { TasksService } from "src/task/domain/task/tasks.service";
import { UpdateTaskCommand } from "./update-task.command";



@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {
    constructor(
        @Inject('TaskRepository')
        private readonly taskRepository: ITaskRepository,
        private readonly historyService: HistoryService,
        private readonly taskService: TasksService,
    ) { }

    async execute(command: UpdateTaskCommand) {
        if (! await this.taskService.checkTaskOfUser(command.userId, command.id)) {
            throw new NotFoundException('Task not found');
        }
        const newTask = await this.taskRepository.findOneTaskById(command.id)
        if (!newTask) {
            throw new NotFoundException("Task not found");
        }
        newTask.updateTask(command.userId, command.id, command.name, command.description, command.priority, command.DueDate);
        await this.taskRepository.updateOne(command.id, newTask);
        await this.historyService.createHistory("update", "task", JSON.stringify(newTask), command.userId, "TASK", newTask.id);
        return newTask;
    }
}
