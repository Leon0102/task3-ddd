/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';

export class RemoveUserFromProjectCommand implements ICommand {
    constructor(
        readonly id: number,
        readonly userId: number,
    ) { }
}