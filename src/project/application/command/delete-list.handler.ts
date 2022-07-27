/* eslint-disable prettier/prettier */

import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { DeleteListCommand } from "./delete-list.command";
import { IListRepository } from "src/project/domain/list.repository";
import { Inject, NotFoundException } from "@nestjs/common";
import { ListDeletedEvent } from "src/project/domain/event/list-deleted.event";
import { HistoryService } from "src/history/history.service";


@CommandHandler(DeleteListCommand)
export class DeleteListHandler implements ICommandHandler<DeleteListCommand> {
    constructor(
        @Inject('ListRepository')
        private readonly listRepository: IListRepository,
        private readonly eventBus: EventBus,
        private readonly historyService: HistoryService,
    ) { }

    async execute(command: DeleteListCommand) {
        if (! await this.listRepository.checkListOfUser(command.userId, command.id)) {
            throw new NotFoundException('List not found');
        }
        const list = await this.listRepository.getOne(command.id);
        const project = await list.project;
        const users = await project.users;
        const isUser = users.find(user => user.id === command.userId);
        if (!isUser) {
            throw new NotFoundException("User not found");
        }
        if (!list) {
            throw new NotFoundException('List not found');
        }
        const delList = await this.listRepository.deleteOne(command.id);
        await this.historyService.createHistory("delete", "list", JSON.stringify(delList), command.userId, "LIST", list.id);
        this.eventBus.publish(new ListDeletedEvent(list.id));
        return delList;
    }
}
