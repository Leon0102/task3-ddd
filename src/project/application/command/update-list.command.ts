/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';

export class UpdateListCommand implements ICommand {
    constructor(
        readonly userId: number,
        readonly id: number,
        readonly name: string,
        readonly color: string,
    ) { }
}