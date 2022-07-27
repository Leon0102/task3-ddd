/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';

export class CreateTodoCommand implements ICommand {
    constructor(
        readonly userId: number,
        readonly name: string,
        readonly taskId: number,
        readonly parentId: number,
    ) { }
}