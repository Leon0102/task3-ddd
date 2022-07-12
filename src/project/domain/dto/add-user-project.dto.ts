/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
export class AddUserToProjectDTO {

    @IsNotEmpty()
    userId: number;
}