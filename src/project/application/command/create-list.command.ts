/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';

export class CreateListCommand implements ICommand {
    constructor(
        readonly userId: number,
        readonly name: string,
        readonly color: string,
        readonly projectId: number,
    ) { }
}