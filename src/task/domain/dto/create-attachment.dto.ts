/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
export class CreateAttachmentDTO {

    @IsNotEmpty()
    fileName: string;
}