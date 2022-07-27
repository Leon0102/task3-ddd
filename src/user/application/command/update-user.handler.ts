/* eslint-disable prettier/prettier */
import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { IUserRepository } from "src/user/domain/user.repository";
import { UpdateUserCommand } from "./update-user.command";


@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(command: UpdateUserCommand): Promise<any> {
        const user = await this.userRepository.getOne(command.id);
        await user.update(command.name, command.password);
        await this.userRepository.saveOne(user);
        return user
    }
}
