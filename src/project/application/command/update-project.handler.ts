/* eslint-disable prettier/prettier */

import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ProjectsService } from "src/project/domain/projects.service";
import { UpdateProjectCommand } from "./update-project.command";


@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler implements ICommandHandler<UpdateProjectCommand> {
    constructor(
        private readonly projectService: ProjectsService,
    ) { }

    async execute(command: UpdateProjectCommand): Promise<void> {
        const project = await this.projectService.updateProject(command.id, command.name, command.description);
        return project;
    }
}
