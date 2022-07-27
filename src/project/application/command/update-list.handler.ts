/* eslint-disable prettier/prettier */
import { Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { HistoryService } from "src/history/history.service";
import { IListRepository } from "src/project/domain/list.repository";
import { UpdateListCommand } from "./update-list.command";

@CommandHandler(UpdateListCommand)
export class UpdateListHandler implements ICommandHandler<UpdateListCommand> {
    constructor(
        @Inject('ListRepository')
        private readonly listRepository: IListRepository,
        private readonly historyService: HistoryService,
    ) { }

    async execute(command: UpdateListCommand) {
        if (! await this.listRepository.checkListOfUser(command.userId, command.id)) {
            throw new NotFoundException('List not found');
        }
        const list = await this.listRepository.findOneList(command.id);
        list.update(command.name, command.color);
        await this.historyService.createHistory("update", "list", JSON.stringify(list), command.userId, "LIST", list.id);
        await this.listRepository.updateOne(command.id, list);
        return list;
    }
}
