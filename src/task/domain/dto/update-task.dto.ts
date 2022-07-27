/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
import { Priority } from "../task/task.entity";
export class UpdateTaskDTO {

    name: string;

    description: string;

    priority: Priority;

    DueDate: Date;
}