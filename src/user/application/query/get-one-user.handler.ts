/* eslint-disable prettier/prettier */
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/domain/entity/user.entity";
import { IUserRepository } from "src/user/domain/user.repository";
import { UserRepository } from "src/user/infrastructure/repository/user.repository";
import { GetOneUserQuery } from "./get-one-user.query";


@QueryHandler(GetOneUserQuery)
export class GetOneUserHandler implements IQueryHandler<GetOneUserQuery> {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(query: GetOneUserQuery): Promise<UserEntity> {
        return this.userRepository.getOne(query.getId());
    }
}