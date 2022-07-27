/* eslint-disable prettier/prettier */
import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { AuthService } from './auth.service';
import { EventBus } from '@nestjs/cqrs';
import { IUserRepository } from './user.repository';

@Injectable()
export class UsersService {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository,
        @Inject(forwardRef(() => AuthService))
        private authService: AuthService,
        private readonly eventBus: EventBus
    ) { }

    async findUserByEmail(email: string): Promise<UserEntity> {
        return this.userRepository.findOneByEmail(email);
    }

    async saveorupdateRefreshToken(refreshToken: string, id: number, refreshtokenexpires): Promise<void> {
        const user = await this.userRepository.findOneUser(id);
        user.refreshToken = refreshToken;
        user.refreshtokenexpires = refreshtokenexpires;
        return await this.userRepository.updateOne(id, user);
    }

    async login(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findOneByEmail(email);
        if (user && await user.comparePassword(password)) {
            const accessToken = await this.authService.generateJwt(user);
            const refreshToken = await this.authService.generateRefreshToken(user.id);
            return {
                // user,
                accessToken,
                refreshToken,
            };
        }
        else {
            throw new UnauthorizedException('Invalid credentials');
        }
    }
}
