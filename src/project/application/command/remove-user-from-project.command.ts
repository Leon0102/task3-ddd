/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';

export class RemoveUserFromProjectCommand implements ICommand {
    constructor(
        readonly userCreatedId: number,
        readonly id: number,
        readonly userId: number,
    ) { }
}