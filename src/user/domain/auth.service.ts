/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import * as randtoken from 'rand-token';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
// import { CreateUserDTO } from 'src/users/model/dto/create-user.dto';
import { UsersService } from 'src/user/domain/users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
    ) { }

    async generateJwt(user: any): Promise<string> {
        return this.jwtService.sign({ user }, {
            secret: process.env.JWT_SECRET,
        });
    }

    async generateRefreshToken(userId: number): Promise<string> {
        const refreshToken = randtoken.generate(32);
        const expirydate = new Date();
        expirydate.setDate(expirydate.getDate() + 6);
        await this.usersService.saveorupdateRefreshToken(refreshToken, userId, expirydate);
        return refreshToken
    }

    async refreshToken(user: any) {
        return {
            accessToken: await this.generateJwt(user),
            refreshToken: await this.generateRefreshToken(user.id)
        }
    }
}
