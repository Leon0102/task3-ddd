/* eslint-disable prettier/prettier */
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UsersService } from "src/user/domain/users.service";
import { LoginUserCommand } from "./login-user.command";

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
    constructor(
        private readonly userService: UsersService,
    ) { }
    async execute(command: LoginUserCommand): Promise<any> {
        return await this.userService.login(command.email, command.password);
    }
}
