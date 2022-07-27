/* eslint-disable prettier/prettier */

import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UserEntity } from "src/user/domain/entity/user.entity";
// import { UserRepository } from "src/user/infrastructure/repository/user.repository";
import { CreateUserCommand } from "./create-user.command";
import { UsersService } from "src/user/domain/users.service";
import { IUserRepository } from "src/user/domain/user.repository";
import { BadRequestException, Inject, NotFoundException } from "@nestjs/common";
// import { UserCreatedEvent } from "../../domain/event/user-created.event";


@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private readonly userService: UsersService,
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository,
        private publisher: EventPublisher,
    ) { }

    async execute(command: CreateUserCommand) {
        const isExist = await this.userRepository.checkExistEmail(command.email);
        if (isExist) {
            throw new BadRequestException('Email already exists');
        }
        const newUser = new UserEntity(command.name, command.email, command.password);
        await newUser.setPassword(command.password);
        // await this.userService.create(newUser);
        const User = this.publisher.mergeObjectContext(
            await this.userRepository.createOne(newUser)
        );
        User.addProject();
        User.commit();
    }
}