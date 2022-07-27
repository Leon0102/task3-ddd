/* eslint-disable prettier/prettier */
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { TransformInterceptor } from 'src/interceptor/transform.interceptor';
import { CreateUserDTO } from 'src/user/domain/dto/create-user.dto';
import { CreateUserCommand } from './command/create-user.command';
import { DeleteUserCommand } from './command/delete-user.command';
import { RestoreUserCommand } from './command/restore-user.command';
import { UpdateUserCommand } from './command/update-user.command';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { GetOneUserQuery } from './query/get-one-user.query';
import { GetUsersQuery } from './query/get-all-users.query';
import { UserEntity } from '../domain/entity/user.entity';
import { LoginUserDTO } from '../domain/dto/login-user.dto';
import { LoginUserCommand } from './command/login-user.command';
import { HistoryService } from 'src/history/history.service';
import { AuthService } from '../domain/auth.service';


@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(new HttpExceptionFilter())
export class UsersController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
        private readonly authService: AuthService,
        private readonly historyService: HistoryService
    ) { }

    @Post()
    async createUser(@Body() user: CreateUserDTO): Promise<UserEntity> {
        const newUser = await this.commandBus.execute(new CreateUserCommand(user.name, user.email, user.password));
        return newUser;
    }

    @Get()
    async findAll(): Promise<UserEntity[]> {
        return this.queryBus.execute(new GetUsersQuery());
    }

    @Get('/history')
    @UseGuards(AuthGuard('jwt'))
    async getHistory(@Req() req: any) {
        return this.historyService.getAllHistoryByUser(req.user.id);
    }

    @Get('/me')
    @UseGuards(AuthGuard('jwt'))
    async getCurrentUser(@Req() req: any) {
        return req.user;
    }

    @Get('/:id')
    async findUserById(@Param('id') id: number): Promise<UserEntity> {
        return this.queryBus.execute(new GetOneUserQuery(id));
    }


    @Patch()
    @UseGuards(AuthGuard('jwt'))
    async updateUser(@Req() req: any, @Body() user: CreateUserDTO): Promise<UserEntity> {
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


    @Post('/login')
    @HttpCode(200)
    login(@Body() loginUser: LoginUserDTO) {
        return this.commandBus.execute(new LoginUserCommand(loginUser.email, loginUser.password));
    }




    @Post('refresh-token')
    @UseGuards(AuthGuard('jwt-refreshtoken'))
    async refreshToken(@Req() req: any) {
        return this.authService.refreshToken(req.user);
    }

}