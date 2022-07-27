/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';

export class AssignLabelToTaskCommand implements ICommand {
    constructor(
        readonly userCreatedById: number,
        readonly labelId: number,
        readonly taskId: number,
    ) { }
}