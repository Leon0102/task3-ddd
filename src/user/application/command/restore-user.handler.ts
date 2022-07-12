/* eslint-disable prettier/prettier */

import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { IUserRepository } from "src/user/domain/user.repository";
import { UserRepository } from "src/user/infrastructure/repository/user.repository";
import { RestoreUserCommand } from "./restore-user.command";



@CommandHandler(RestoreUserCommand)
export class RestoreUserHandler implements ICommandHandler<RestoreUserCommand> {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(command: RestoreUserCommand): Promise<void> {
        await this.userRepository.restoreOne(command.id);
    }
}
