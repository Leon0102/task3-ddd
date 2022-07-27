/* eslint-disable prettier/prettier */
import { Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { IUserRepository } from "src/user/domain/user.repository";
import { DeleteUserCommand } from "./delete-user.command";

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(command: DeleteUserCommand): Promise<any> {
        const user = await this.userRepository.getOne(command.id);
        if (user) {
            return await this.userRepository.deleteOne(command.id);
        }
        else {
            throw new NotFoundException('User not found');
        }

    }
}
