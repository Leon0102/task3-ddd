/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
export class CreateListDTO {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    color: string;

    @IsNotEmpty()
    projectId: number;
}