/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';

export class DeleteListCommand implements ICommand {
    constructor(
        readonly id: number
    ) { }
}