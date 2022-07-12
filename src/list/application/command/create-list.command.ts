/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';

export class CreateListCommand implements ICommand {
    constructor(
        readonly name: string,
        readonly color: string,
        readonly projectId: number,
    ) { }
}