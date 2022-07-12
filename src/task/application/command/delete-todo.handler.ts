/* eslint-disable prettier/prettier */

import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { TodoEntity } from "src/task/domain/todo/todo.entity";
import { ITodoRepository } from "src/task/domain/todo/todo.repository";
import { DeleteTodoCommand } from "./delete-todo.command";



@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand> {
    constructor(
        private readonly todoRepository: ITodoRepository,
    ) { }

    async execute(command: DeleteTodoCommand): Promise<TodoEntity> {
        return await this.todoRepository.deleteOne(command.id);
    }
}
