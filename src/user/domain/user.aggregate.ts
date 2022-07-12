/* eslint-disable prettier/prettier */
import { InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { AggregateRoot } from "@nestjs/cqrs";
import * as bcrypt from 'bcrypt';


export class User extends AggregateRoot {
}