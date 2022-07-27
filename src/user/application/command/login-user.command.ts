/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';

export class LoginUserCommand implements ICommand {
    constructor(
        readonly email: string,
        readonly password: string,
    ) { }
}