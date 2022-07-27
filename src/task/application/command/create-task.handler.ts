/* eslint-disable prettier/prettier */
import { Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { HistoryService } from "src/history/history.service";
import { IListRepository } from "src/project/domain/list.repository";
import { TaskEntity } from "src/task/domain/task/task.entity";
import { ITaskRepository } from "src/task/domain/task/task.repository";
import { IUserRepository } from "src/user/domain/user.repository";
import { CreateTaskCommand } from "./create-task.command";


@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
    constructor(
        @Inject('TaskRepository')
        private readonly taskRepository: ITaskRepository,
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository,
        @Inject('ListRepository')
        private readonly listRepository: IListRepository,
        private readonly historyService: HistoryService,
    ) { }

    async execute(command: CreateTaskCommand) {
        if (!await this.listRepository.checkListOfUser(command.userId, command.listId)) {
            throw new NotFoundException('List not found');
        }
        const user = await this.userRepository.getOne(command.userId);
        const newTask = new TaskEntity(command.name, command.description, command.listId, command.userId);
        await newTask.addUser(user);
        await this.taskRepository.saveOne(newTask);
        await this.historyService.createHistory("create", "task", JSON.stringify(newTask), command.userId, "TASK", newTask.id);
        for (const user of await newTask.users) {
            delete user.projects;
        }
        return newTask;
    }
}
