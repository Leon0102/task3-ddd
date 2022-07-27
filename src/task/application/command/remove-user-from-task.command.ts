/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';

export class RemoveUserFromTaskCommand implements ICommand {
    constructor(
        readonly userCreatedById: number,
        readonly userId: number,
        readonly taskId: number,
    ) { }
}