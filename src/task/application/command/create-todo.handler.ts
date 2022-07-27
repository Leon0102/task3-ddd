/* eslint-disable prettier/prettier */
import { Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { HistoryService } from "src/history/history.service";
import { TasksService } from "src/task/domain/task/tasks.service";
import { TodoEntity } from "src/task/domain/todo/todo.entity";
import { ITodoRepository } from "src/task/domain/todo/todo.repository";
import { CreateTodoCommand } from "./create-todo.command";


@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
    constructor(
        @Inject('TodoRepository')
        private readonly todoRepository: ITodoRepository,
        private readonly historyService: HistoryService,
        private readonly taskService: TasksService,
    ) { }

    async execute(command: CreateTodoCommand) {
        if (! await this.taskService.checkTaskOfUser(command.userId, command.taskId)) {
            throw new NotFoundException('Task not found');
        }
        const newTodo = new TodoEntity();
        newTodo.name = command.name;
        newTodo.taskId = command.taskId;
        newTodo.parentId = command.parentId;
        await this.todoRepository.createOne(newTodo);
        await this.historyService.createHistory("create", "todo", JSON.stringify(newTodo), command.userId, "TODO", newTodo.id);
        return newTodo;
    }
}
