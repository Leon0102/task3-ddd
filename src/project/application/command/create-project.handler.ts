/* eslint-disable prettier/prettier */
import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { HistoryService } from "src/history/history.service";
import { ListsService } from "src/project/domain/list.service";
import { ProjectEntity } from "src/project/domain/project.entity";
import { IProjectRepository } from "src/project/domain/project.repository";
import { ProjectsService } from "src/project/domain/projects.service";
import { IUserRepository } from "src/user/domain/user.repository";
import { UserRepository } from "src/user/infrastructure/repository/user.repository";
import { CreateProjectCommand } from "./create-project.command";


@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler implements ICommandHandler<CreateProjectCommand> {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository,
        @Inject('ProjectRepository')
        private readonly projectRepository: IProjectRepository,
        private readonly historyService: HistoryService,
        private readonly listService: ListsService,
    ) { }

    async execute(command: CreateProjectCommand) {
        const project = new ProjectEntity(command.name, command.description);
        const user = await this.userRepository.getOne(command.userId);
        await project.addUser(user);
        const project_save = await this.projectRepository.createOne(project);
        await this.listService.create(user.id, 'Default List', '#ff0000', project_save);
        await this.historyService.createHistory("create", "project", JSON.stringify(project), user.id, "PROJECT", project_save.id);
        return project;
    }
}
