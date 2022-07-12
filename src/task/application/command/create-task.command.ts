/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';

export class CreateTaskCommand implements ICommand {
    constructor(
        readonly name: string,
        readonly description: string,
        readonly listId: number,
        readonly userId: number,
    ) { }
}