/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty } from "class-validator";
export class CreateUserDTO {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

}