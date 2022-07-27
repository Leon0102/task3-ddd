/* eslint-disable prettier/prettier */
import { Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ListEntity } from "src/project/domain/list.entity";
import { ListsService } from "src/project/domain/list.service";
import { IProjectRepository } from "src/project/domain/project.repository";
import { ProjectsService } from "src/project/domain/projects.service";
import { CreateListCommand } from "./create-list.command";


@CommandHandler(CreateListCommand)
export class CreateListHandler implements ICommandHandler<CreateListCommand> {
    constructor(
        private readonly listService: ListsService,
        @Inject('ProjectRepository')
        private readonly projectRepository: IProjectRepository,
    ) { }

    async execute(command: CreateListCommand) {
        const project = await this.projectRepository.getOne(command.projectId);
        if (!project) {
            throw new NotFoundException(`Project with id ${command.projectId} not found`);
        }
        if (!await this.projectRepository.checkProjectOfUser(project.id, command.userId)) {
            throw new NotFoundException('Project not found');
        }
        const newList = await this.listService.create(command.userId, command.name, command.color, project);
        return newList;
    }
}
