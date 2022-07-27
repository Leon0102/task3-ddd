/* eslint-disable prettier/prettier */

import { BadRequestException, Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { HistoryService } from "src/history/history.service";
import { ProjectEntity } from "src/project/domain/project.entity";
import { IProjectRepository } from "src/project/domain/project.repository";
import { IUserRepository } from "src/user/domain/user.repository";
import { AddUserToProjectCommand } from "./add-user-to-project.command";

@CommandHandler(AddUserToProjectCommand)
export class AddUserToProjectHandler implements ICommandHandler<AddUserToProjectCommand> {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository,
        @Inject('ProjectRepository')
        private readonly projectRepository: IProjectRepository,
        private readonly historyService: HistoryService,
    ) { }
    async execute(command: AddUserToProjectCommand) {
        const user = await this.userRepository.getOne(command.userId);
        if (!user) {
            throw new BadRequestException("User does not exist");
        }
        if (await this.projectRepository.checkProjectOfUser(command.id, command.userCreatedId) === false) {
            throw new BadRequestException("User does not exist in project");
        }
        const usersOfProject = await this.userRepository.getUsersOfProjects(command.id);
        if (usersOfProject.find(user => user.id === command.userId)) {
            throw new BadRequestException("User already exists in project");
        }
        const project = await this.projectRepository.getOne(command.id);
        await project.addUser(user);
        await this.projectRepository.saveOne(project);
        await this.historyService.createHistory("Assign User to Project", `Assign user ${command.userId} to project ${project.id}`, JSON.stringify(project), command.userCreatedId, "PROJECT", project.id);
    }
}
