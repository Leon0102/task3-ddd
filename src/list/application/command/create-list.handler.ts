/* eslint-disable prettier/prettier */
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { List } from "src/list/domain/list.aggregate";
import { ListEntity } from "src/list/domain/list.entity";
import { ListsService } from "src/list/domain/list.service";
import { ProjectsService } from "src/project/domain/projects.service";
import { CreateListCommand } from "./create-list.command";


@CommandHandler(CreateListCommand)
export class CreateListHandler implements ICommandHandler<CreateListCommand> {
    constructor(
        private readonly listService: ListsService,
        private readonly projectService: ProjectsService,
    ) { }

    async execute(command: CreateListCommand): Promise<ListEntity> {
        const newList = new ListEntity();
        newList.name = command.name;
        newList.color = command.color;
        const project = await this.projectService.findOneById(command.projectId);
        await this.listService.create(newList, project);
        return newList;
    }
}
