/* eslint-disable prettier/prettier */
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ProjectEntity } from "src/project/domain/project.entity";
import { ProjectsService } from "src/project/domain/projects.service";
import { IUserRepository } from "src/user/domain/user.repository";
import { CreateProjectCommand } from "./create-project.command";


@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler implements ICommandHandler<CreateProjectCommand> {
    constructor(
        private readonly projectService: ProjectsService,
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(command: CreateProjectCommand): Promise<ProjectEntity> {
        const project = new ProjectEntity()
        project.name = command.name;
        project.description = command.description;
        const user = await this.userRepository.getOne(command.userId);
        await this.projectService.create(project, user);
        return project;
    }
}
