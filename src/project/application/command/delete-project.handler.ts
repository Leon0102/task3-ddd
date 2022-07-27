/* eslint-disable prettier/prettier */

import { Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { HistoryService } from "src/history/history.service";
import { ListDeletedEvent } from "src/project/domain/event/list-deleted.event";
import { IListRepository } from "src/project/domain/list.repository";
import { IProjectRepository } from "src/project/domain/project.repository";
import { ProjectsService } from "src/project/domain/projects.service";
import { DeleteProjectCommand } from "./delete-project.command";


@CommandHandler(DeleteProjectCommand)
export class DeleteProjectHandler implements ICommandHandler<DeleteProjectCommand> {
    constructor(
        @Inject('ProjectRepository')
        private readonly projectRepository: IProjectRepository,
        @Inject('ListRepository')
        private readonly listRepository: IListRepository,
        private readonly eventBus: EventBus,
        private readonly historyService: HistoryService,
    ) { }

    async execute(command: DeleteProjectCommand) {
        const project = await this.projectRepository.getOne(command.id);
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        if (!await this.projectRepository.checkProjectOfUser(project.id, command.userId)) {
            throw new NotFoundException('Project not found');
        }
        await this.projectRepository.deleteOne(command.id);
        await this.historyService.createHistory("delete", "project", JSON.stringify(project), command.userId, "PROJECT", project.id);
        for (const list of project.lists) {
            await this.listRepository.deleteOne(list.id);
            this.eventBus.publish(new ListDeletedEvent(list.id));
        }
        return project;
    }
}