/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';

export class CreateLabelCommand implements ICommand {
    constructor(
        readonly title: string,
        readonly color: string,
        readonly taskId: number,
    ) { }
}