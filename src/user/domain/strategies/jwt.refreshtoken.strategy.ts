/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/user/domain/users.service';

import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refreshtoken") {
    constructor(private userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('accessToken'),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_SECRET,
            passReqToCallback: true
        });
    }

    async validate(req: any, payload: any) {
        const user = await this.userService.findUserByEmail(payload.user.email);
        // console.log(user);
        if (!user) {
            throw new UnauthorizedException();
        }
        if (user.refreshToken !== req.body.refreshToken) {
            throw new UnauthorizedException();
        }
        if (new Date() > new Date(user.refreshtokenexpires)) {
            throw new UnauthorizedException();
        }
        return { id: user.id, email: user.email, password: user.password, refreshToken: user.refreshToken, refreshtokenexpires: user.refreshtokenexpires };
    }
}