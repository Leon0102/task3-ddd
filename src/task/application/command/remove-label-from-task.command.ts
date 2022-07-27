/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';

export class RemoveLabelFromTaskCommand implements ICommand {
    constructor(
        readonly userId: number,
        readonly taskId: number,
        readonly labelId: number,
    ) { }
}