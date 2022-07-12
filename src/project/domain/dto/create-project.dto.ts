/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
export class CreateProjectDTO {

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    name: string;
}