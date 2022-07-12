/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
export class CreateTaskDTO {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    listId: number;

    userId: number;
}