/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';

export class CreateLabelCommand implements ICommand {
    constructor(
        readonly userId: number,
        readonly title: string,
        readonly color: string,
    ) { }
}