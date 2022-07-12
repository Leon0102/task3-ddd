/* eslint-disable prettier/prettier */
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { IListRepository } from "src/list/domain/list.repository";
import { UpdateListCommand } from "./update-list.command";

@CommandHandler(UpdateListCommand)
export class UpdateListHandler implements ICommandHandler<UpdateListCommand> {
    constructor(
        private readonly listRepository: IListRepository,
    ) { }

    async execute(command: UpdateListCommand) {
        const list = await this.listRepository.getOne(command.id);
        list.name = command.name;
        list.color = command.color;
        await this.listRepository.updateOne(command.id, list);
    }
}
