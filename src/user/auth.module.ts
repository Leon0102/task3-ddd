/* eslint-disable prettier/prettier */
import { Module, Provider } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/user/domain/auth.service';
// import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { JwtStrategy } from 'src/user/domain/strategies/jwt.strategy';
import * as dotenv from 'dotenv';
import { JwtRefreshTokenStrategy } from 'src/user/domain/strategies/jwt.refreshtoken.strategy';
import { UsersService } from 'src/user/domain/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './infrastructure/repository/user.repository';
import { CqrsModule } from '@nestjs/cqrs';

dotenv.config();


export const UserRepoProvider: Provider = {
  provide: 'UserRepository',
  useClass: UserRepository
}

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '600s' },
  }),
  TypeOrmModule.forFeature([UserRepository]),
    CqrsModule],
  providers: [UserRepoProvider, AuthService, JwtService, JwtStrategy, JwtRefreshTokenStrategy, UsersService],
  exports: [AuthService, UsersService],
})
export class AuthModule { }
