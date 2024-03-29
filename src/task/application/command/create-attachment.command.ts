/* eslint-disable prettier/prettier */
import { ICommand } from '@nestjs/cqrs';

export class CreateAttachmentCommand implements ICommand {
    constructor(
        readonly userId: number,
        readonly filePath: string,
        readonly fileName: string,
        readonly taskId: number,
    ) { }
}