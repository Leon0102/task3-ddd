/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';

export class RestoreUserCommand implements ICommand {
    constructor(
        readonly id: number,
    ) { }
}