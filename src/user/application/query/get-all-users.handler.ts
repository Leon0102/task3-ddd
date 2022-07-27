/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserEntity } from 'src/user/domain/entity/user.entity';
import { IUserRepository } from 'src/user/domain/user.repository';
import { GetUsersQuery } from './get-all-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(): Promise<UserEntity[]> {
        const users = await this.userRepository.findAll();
        return users;
    }
}
