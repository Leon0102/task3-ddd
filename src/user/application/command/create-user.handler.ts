/* eslint-disable prettier/prettier */

import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserEntity } from "src/user/domain/entity/user.entity";
// import { UserRepository } from "src/user/infrastructure/repository/user.repository";
import { CreateUserCommand } from "./create-user.command";
import { UsersService } from "src/user/domain/users.service";
import { AuthService } from "src/user/domain/auth.service";
// import { UserCreatedEvent } from "../../domain/event/user-created.event";


@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService,
    ) { }

    async execute(command: CreateUserCommand): Promise<UserEntity> {
        const newUser = new UserEntity();
        newUser.name = command.name;
        newUser.email = command.email;
        newUser.password = await this.authService.hashPassword(command.password);
        await this.userService.create(newUser);
        return newUser;
    }
}