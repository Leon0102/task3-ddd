/* eslint-disable prettier/prettier */
import { Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { HistoryService } from "src/history/history.service";
import { TaskEntity } from "src/task/domain/task/task.entity";
import { ITaskRepository } from "src/task/domain/task/task.repository";
import { TasksService } from "src/task/domain/task/tasks.service";
import { DeleteTaskCommand } from "./delete-task.command";



@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
    constructor(
        @Inject('TaskRepository')
        private readonly taskRepository: ITaskRepository,
        private readonly historyService: HistoryService,
        private readonly taskService: TasksService,
    ) { }

    async execute(command: DeleteTaskCommand) {
        if (! await this.taskService.checkTaskOfUser(command.userId, command.id)) {
            throw new NotFoundException('Task not found');
        }
        const task = await this.taskRepository.deleteOne(command.id);
        await this.historyService.createHistory("delete", "task", JSON.stringify(task), command.userId, "TASK", task.id);
        return task;
    }
}
