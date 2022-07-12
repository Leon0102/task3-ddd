/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
export class CreateToDoDTO {

    @IsNotEmpty()
    name: string;

    parentId: number;
}