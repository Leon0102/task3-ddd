/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
export class DeleteLabelFromTaskDTO {

    @IsNotEmpty()
    taskId: number;

    @IsNotEmpty()
    labelId: number;
}