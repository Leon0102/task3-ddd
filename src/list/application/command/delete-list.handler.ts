/* eslint-disable prettier/prettier */

import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { List } from "src/list/domain/list.aggregate";
import { ListsService } from "src/list/domain/list.service";
import { DeleteListCommand } from "./delete-list.command";


@CommandHandler(DeleteListCommand)
export class DeleteListHandler implements ICommandHandler<DeleteListCommand> {
    constructor(
        private readonly listService: ListsService
    ) { }

    async execute(command: DeleteListCommand): Promise<List> {
        return await this.listService.delete(command.id);
    }
}
