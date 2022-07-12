/* eslint-disable prettier/prettier */
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/domain/entity/user.entity';
import { IUserRepository } from 'src/user/domain/user.repository';
import { UserRepository } from 'src/user/infrastructure/repository/user.repository';
import { GetUsersQuery } from './get-all-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(): Promise<UserEntity[]> {
        const users = await this.userRepository.findAll();
        return users;
    }
}
