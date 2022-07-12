/* eslint-disable prettier/prettier */
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Task } from "src/task/domain/task.aggregate";
import { TaskEntity } from "src/task/domain/task/task.entity";
import { ITaskRepository } from "src/task/domain/task/task.repository";
import { CreateTaskCommand } from "./create-task.command";


@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
    constructor(
        private readonly taskRepository: ITaskRepository,
    ) { }

    async execute(command: CreateTaskCommand): Promise<Task> {
        const task = new Task(command.name, command.description, command.listId, command.userId);
        const newTask = new TaskEntity();
        newTask.name = command.name;
        newTask.description = command.description;
        newTask.listId = command.listId;
        newTask.userId = command.userId;
        this.taskRepository.save(newTask);
        task.commit();
        return task;
    }
}
