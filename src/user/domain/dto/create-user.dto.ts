/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
export class CreateUserDTO {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

}