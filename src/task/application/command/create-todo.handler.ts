/* eslint-disable prettier/prettier */
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { TodoEntity } from "src/task/domain/todo/todo.entity";
import { ITodoRepository } from "src/task/domain/todo/todo.repository";
import { CreateTodoCommand } from "./create-todo.command";


@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
    constructor(
        private readonly todoRepository: ITodoRepository,
    ) { }

    async execute(command: CreateTodoCommand): Promise<TodoEntity> {
        const newTodo = new TodoEntity();
        newTodo.name = command.name;
        newTodo.taskId = command.taskId;
        newTodo.parentId = command.parentId;
        this.todoRepository.createOne(newTodo);
        return newTodo;
    }
}
