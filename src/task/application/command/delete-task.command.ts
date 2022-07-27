/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';

export class DeleteTaskCommand implements ICommand {
    constructor(
        readonly userId: number,
        readonly id: number,
    ) { }
}