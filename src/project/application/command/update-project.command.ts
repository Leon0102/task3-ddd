/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';

export class UpdateProjectCommand implements ICommand {
    constructor(
        readonly userId: number,
        readonly id: number,
        readonly name: string,
        readonly description: string,
    ) { }
}