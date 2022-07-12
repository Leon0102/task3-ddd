/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
export class CreateLabelDTO {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    color: string;
}