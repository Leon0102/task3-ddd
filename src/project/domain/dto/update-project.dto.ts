/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
export class UpdateProjectDTO {

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    name: string;
}