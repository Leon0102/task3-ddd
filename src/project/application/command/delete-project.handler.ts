/* eslint-disable prettier/prettier */

import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ProjectsService } from "src/project/domain/projects.service";
import { DeleteProjectCommand } from "./delete-project.command";


@CommandHandler(DeleteProjectCommand)
export class DeleteProjectHandler implements ICommandHandler<DeleteProjectCommand> {
    constructor(
        private readonly projectService: ProjectsService,
    ) { }

    async execute(command: DeleteProjectCommand): Promise<void> {
        await this.projectService.deleteProject(command.id);
    }
}