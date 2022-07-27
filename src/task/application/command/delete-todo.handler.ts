/* eslint-disable prettier/prettier */

import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { HistoryService } from "src/history/history.service";
import { TodoEntity } from "src/task/domain/todo/todo.entity";
import { ITodoRepository } from "src/task/domain/todo/todo.repository";
import { DeleteTodoCommand } from "./delete-todo.command";



@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand> {
    constructor(
        @Inject('TodoRepository')
        private readonly todoRepository: ITodoRepository,
        private readonly historyService: HistoryService,
    ) { }

    async execute(command: DeleteTodoCommand): Promise<TodoEntity> {
        const todo = await this.todoRepository.deleteOne(command.id);
        await this.historyService.createHistory("delete", "todo", JSON.stringify(todo), command.userId, "TODO", todo.id);
        return todo;
    }
}
