/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
export class CreateTaskDTO {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    listId: number;
}