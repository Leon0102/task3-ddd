/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';

export class DeleteProjectCommand implements ICommand {
    constructor(
        readonly userId: number,
        readonly id: number,
    ) { }
}