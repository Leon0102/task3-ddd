/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from 'src/modules/auth/auth.module';
// import { AuthService } from 'src/modules/auth/auth.service';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    AuthModule,
    CqrsModule,],
  controllers: [UsersController],
  providers: [Object, UsersService, JwtService, AuthService, GetUsersHandler, CreateUserHandler, GetOneUserHandler, UpdateUserHandler, DeleteUserHandler, RestoreUserHandler],
  exports: [UsersService]
})
export class UsersModule { }
