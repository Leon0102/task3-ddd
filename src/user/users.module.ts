/* eslint-disable prettier/prettier */
import { Module, Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/user/application/users.controller';
import { AuthService } from 'src/user/domain/auth.service';
import { UsersService } from 'src/user/domain/users.service';
import { UserRepository } from './infrastructure/repository/user.repository';
import { AuthModule } from './auth.module';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUsersHandler } from 'src/user/application/query/get-all-users.handler';
import { CreateUserHandler } from './application/command/create-user.handler';
import { GetOneUserHandler } from './application/query/get-one-user.handler';
import { UpdateUserHandler } from './application/command/update-user.handler';
import { DeleteUserHandler } from './application/command/delete-user.handler';
import { RestoreUserHandler } from './application/command/restore-user.handler';
import { LoginUserHandler } from './application/command/login-user.handler';
import { HistoryService } from 'src/history/history.service';
import { HistoryRepository } from 'src/history/history.repository';

export const UserRepoProvider: Provider = {
  provide: 'UserRepository',
  useClass: UserRepository
}


@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, HistoryRepository]),
    AuthModule,
    CqrsModule,],
  controllers: [UsersController],
  providers: [UserRepoProvider, UsersService, JwtService, AuthService, HistoryService, GetUsersHandler, CreateUserHandler, GetOneUserHandler, UpdateUserHandler, DeleteUserHandler, RestoreUserHandler, LoginUserHandler],
  exports: [UsersService, UserRepoProvider]
})
export class UsersModule { }
