/* eslint-disable prettier/prettier */

import { BadRequestException, Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { HistoryService } from "src/history/history.service";
import { ITaskRepository } from "src/task/domain/task/task.repository";
import { TasksService } from "src/task/domain/task/tasks.service";
import { IUserRepository } from "src/user/domain/user.repository";
import { AssignUserToTaskCommand } from "./assign-user-to-task.command";

@CommandHandler(AssignUserToTaskCommand)
export class AssignUserToTaskHandler implements ICommandHandler<AssignUserToTaskCommand> {
    constructor(
        private readonly taskService: TasksService,
        @Inject('TaskRepository')
        private readonly taskRepository: ITaskRepository,
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository,
        private readonly historyService: HistoryService,
    ) { }

    async execute(command: AssignUserToTaskCommand) {
        const task = await this.taskRepository.getOne(command.taskId);
        if (!await this.taskService.checkTaskOfUser(command.userCreatedById, command.taskId)) {
            throw new NotFoundException('Task not found');
        }
        task.userId = command.userId;
        const user = await this.userRepository.findOneUser(command.userId);
        if ((await task.users).find(user => user.id === command.userId)) {
            throw new BadRequestException("User already exists in task");
        }
        // const users = await this.userRepository.getUsersOfTask(command.taskId);
        await task.addUser(user);
        await this.historyService.createHistory('Update', `Assign User ${user.id} to Task ${task.id}`, JSON.stringify(task), command.userCreatedById, 'TASK', command.taskId);
        await this.taskRepository.saveOne(task);
    }
}
