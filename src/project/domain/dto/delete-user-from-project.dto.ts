/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
export class DeleteUserFromProjectDTO {

    @IsNotEmpty()
    userId: number;

}