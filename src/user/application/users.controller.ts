/* eslint-disable prettier/prettier */
import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { TransformInterceptor } from 'src/interceptor/transform.interceptor';
import { CreateUserDTO } from 'src/user/domain/dto/create-user.dto';
import { User } from 'src/user/domain/user.aggregate';
import { UsersService } from 'src/user/domain/users.service';
import { CreateUserCommand } from './command/create-user.command';
import { DeleteUserCommand } from './command/delete-user.command';
import { RestoreUserCommand } from './command/restore-user.command';
import { UpdateUserCommand } from './command/update-user.command';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { GetOneUserQuery } from './query/get-one-user.query';
import { GetUsersQuery } from './query/get-all-users.query';


@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
// @UseFilters(new HttpExceptionFilter())
export class UsersController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Post()
    async createUser(@Body() user: CreateUserDTO): Promise<User> {
        const newUser = await this.commandBus.execute(new CreateUserCommand(user.name, user.email, user.password));
        return newUser;
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.queryBus.execute(new GetUsersQuery());
    }

    @Get('/:id')
    async findUserById(@Param('id') id: number): Promise<User> {
        return this.queryBus.execute(new GetOneUserQuery(id));
    }

    @Patch()
    @UseGuards(AuthGuard('jwt'))
    async updateUser(@Req() req: any, @Body() user: CreateUserDTO): Promise<User> {
        return this.commandBus.execute(new UpdateUserCommand(req.user.id, user.name, user.password));
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(204)
    async deleteUser(@Param('id') id: number): Promise<void> {
        await this.commandBus.execute(new DeleteUserCommand(id));
    }

    @Patch('/:id')
    @UseGuards(AuthGuard('jwt'))
    async restoreUser(@Param('id') id: number): Promise<void> {
        await this.commandBus.execute(new RestoreUserCommand(id));
    }
}