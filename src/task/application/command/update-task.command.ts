/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';
import { Priority } from 'src/task/domain/task/task.entity';

export class UpdateTaskCommand implements ICommand {
    constructor(
        readonly userId: number,
        readonly id: number,
        readonly name: string,
        readonly description: string,
        readonly priority: Priority,
        readonly DueDate: Date,
    ) { }
}