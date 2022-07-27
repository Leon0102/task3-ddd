/* eslint-disable prettier/prettier */

import { Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { HistoryService } from "src/history/history.service";
import { IProjectRepository } from "src/project/domain/project.repository";
import { UpdateProjectCommand } from "./update-project.command";


@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler implements ICommandHandler<UpdateProjectCommand> {
    constructor(
        @Inject('ProjectRepository')
        private readonly projectRepository: IProjectRepository,
        private readonly historyService: HistoryService,
    ) { }

    async execute(command: UpdateProjectCommand) {
        if (!await this.projectRepository.checkProjectOfUser(command.id, command.userId)) {
            throw new NotFoundException('Project not found');
        }
        const project = await this.projectRepository.getOne(command.id);
        project.update(command.name, command.description);
        await this.historyService.createHistory("UPDATE", `Update project ${command.id}`, JSON.stringify(project), command.userId, "PROJECT", project.id);
        await this.projectRepository.saveOne(project);
        return project;
    }
}
