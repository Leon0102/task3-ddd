/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { LoginUserDTO } from 'src/user/domain/dto/login-user.dto';
import { AuthService } from './user/domain/auth.service';
import { UsersService } from './user/domain/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginUser: LoginUserDTO) {
    return this.userService.login(loginUser);
  }

  @Post('refresh-token')
  @UseGuards(AuthGuard('jwt-refreshtoken'))
  async refreshToken(@Req() req: any) {
    return this.authService.login(req.user);
  }
}
