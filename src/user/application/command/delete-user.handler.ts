/* eslint-disable prettier/prettier */
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UsersService } from "src/user/domain/users.service";
import { DeleteUserCommand } from "./delete-user.command";

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
    constructor(
        private readonly userService: UsersService,
    ) { }

    async execute(command: DeleteUserCommand): Promise<void> {
        await this.userService.delete(command.id);
    }
}
