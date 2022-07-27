/* eslint-disable prettier/prettier */
import { BadRequestException, Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { HistoryService } from "src/history/history.service";
import { ITaskRepository } from "src/task/domain/task/task.repository";
import { TasksService } from "src/task/domain/task/tasks.service";
import { IUserRepository } from "src/user/domain/user.repository";
import { RemoveUserFromTaskCommand } from "./remove-user-from-task.command";

@CommandHandler(RemoveUserFromTaskCommand)
export class RemoveUserFromTaskHandler implements ICommandHandler<RemoveUserFromTaskCommand> {
    constructor(
        @Inject('TaskRepository')
        private readonly taskRepository: ITaskRepository,
        private readonly historyService: HistoryService,
        private readonly taskService: TasksService,
    ) { }

    async execute(command: RemoveUserFromTaskCommand) {
        if (! await this.taskService.checkTaskOfUser(command.userCreatedById, command.taskId)) {
            throw new NotFoundException('Task not found');
        }
        const task = await this.taskRepository.getOne(command.taskId);
        if ((task.users).length === 1) {
            throw new BadRequestException('Task must have at least one user');
        }
        const usersOfTask = await task.users;
        if (!usersOfTask.find(user => user.id === command.userId)) {
            throw new BadRequestException("User does not exist in task");
        }
        task.users = usersOfTask.filter(user => user.id !== command.userId);
        if (task.userId === command.userId) {
            task.userId = null;
        }
        await this.taskRepository.saveOne(task);
        await this.historyService.createHistory("remove", "user", JSON.stringify(task), command.userId, "TASK", task.id);
    }
}
