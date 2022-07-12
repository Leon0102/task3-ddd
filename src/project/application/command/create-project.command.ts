/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';

export class CreateProjectCommand implements ICommand {
    constructor(
        readonly name: string,
        readonly description: string,
        readonly userId: number,
    ) { }
    getUserId(): number {
        return this.userId;
    }
}