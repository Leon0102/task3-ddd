/* eslint-disable prettier/prettier */
import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AuthService } from "src/user/domain/auth.service";
import { UserEntity } from "src/user/domain/entity/user.entity";
import { IUserRepository } from "src/user/domain/user.repository";
import { UsersService } from "src/user/domain/users.service";
import { UpdateUserCommand } from "./update-user.command";


@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService,
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(command: UpdateUserCommand): Promise<void> {
        const user = await this.userRepository.getOne(command.id);
        const newUser = new UserEntity();
        newUser.name = command.name;
        newUser.email = user.email;
        newUser.password = command.password;
        newUser.password = await this.authService.hashPassword(user.password);
        await this.userService.updateOne(command.id, newUser);
    }
}
