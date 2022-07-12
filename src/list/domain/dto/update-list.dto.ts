/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
export class UpdateListDTO {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    color: string;
}