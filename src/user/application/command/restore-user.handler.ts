/* eslint-disable prettier/prettier */

import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { IUserRepository } from "src/user/domain/user.repository";
import { RestoreUserCommand } from "./restore-user.command";

@CommandHandler(RestoreUserCommand)
export class RestoreUserHandler implements ICommandHandler<RestoreUserCommand> {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(command: RestoreUserCommand) {
        await this.userRepository.restoreOne(command.id);
    }
}
