/* eslint-disable prettier/prettier */
import { ForbiddenException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
// import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { UserEntity } from './entity/user.entity';
import { User } from './user.aggregate';
import { AuthService } from './auth.service';
import { UserCreatedEvent } from './event/user-created.event';
import { EventBus } from '@nestjs/cqrs';
import { IUserRepository } from './user.repository';
import { UserRepository } from '../infrastructure/repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: IUserRepository,
        @Inject(forwardRef(() => AuthService))
        private authService: AuthService,
        private readonly eventBus: EventBus
    ) { }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.findAll();
    }

    async create(user: UserEntity): Promise<UserEntity> {
        if (await this.userRepository.checkExistEmail(user.email)) {
            throw new ForbiddenException('Email already exists');
        }
        await this.userRepository.save(user);
        this.eventBus.publish(new UserCreatedEvent(user.email));
        return user;
    }

    async findByEmail(email: string): Promise<UserEntity> {
        return this.userRepository.findOneByEmail(email);
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        return this.userRepository.findOneByEmail(email);
    }

    async saveorupdateRefreshToken(refreshToken: string, id: number, refreshtokenexpires): Promise<void> {
        const user = await this.userRepository.findOneUser(id);
        user.refreshToken = refreshToken;
        user.refreshtokenexpires = refreshtokenexpires;
        return await this.userRepository.updateOne(id, user);
    }

    async login(loginUserDTO: LoginUserDTO) {
        const user = await this.userRepository.findOneByEmail(loginUserDTO.email);
        if (user && await this.validatePassword(loginUserDTO.password, user.password)) {
            const accessToken = await this.authService.generateJwt(user);
            const refreshToken = await this.authService.generateRefreshToken(user.id);
            return {
                // user,
                accessToken,
                refreshToken,
            };
        }
        else {
            throw new ForbiddenException('Invalid credentials');
        }
    }

    async validatePassword(password: string, storedPassword: string): Promise<boolean> {
        return this.authService.comparePassword(password, storedPassword);
    }

    async updateOne(id: number, user: CreateUserDTO): Promise<User> {
        const currentUser = await this.userRepository.getOne(id);
        if (currentUser) {
            currentUser.name = user.name;
            currentUser.email = user.email;
            if (user.password) {
                const hashpassword = await this.authService.hashPassword(user.password);
                currentUser.password = hashpassword;
            }
            return this.userRepository.updateOne(id, currentUser);
        }
        else {
            throw new NotFoundException('User not found');
        }
    }

    async delete(id: number): Promise<void> {
        const user = await this.userRepository.getOne(id);
        if (user) {
            await this.userRepository.deleteOne(id);
        }
        else {
            throw new NotFoundException('User not found');
        }
    }
}
