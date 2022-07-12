/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';

export class AddUserToProjectCommand implements ICommand {
    constructor(
        readonly id: number,
        readonly userId: number,
    ) { }
}