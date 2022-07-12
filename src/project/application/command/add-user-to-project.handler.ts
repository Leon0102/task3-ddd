/* eslint-disable prettier/prettier */

import { BadRequestException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ProjectEntity } from "src/project/domain/project.entity";
import { IProjectRepository } from "src/project/domain/project.repository";
import { IUserRepository } from "src/user/domain/user.repository";
import { AddUserToProjectCommand } from "./add-user-to-project.command";

@CommandHandler(AddUserToProjectCommand)
export class AddUserToProjectHandler implements ICommandHandler<AddUserToProjectCommand> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly projectRepository: IProjectRepository,
    ) { }
    async execute(command: AddUserToProjectCommand): Promise<ProjectEntity> {
        const user = await this.userRepository.getOne(command.userId);
        const project = await this.projectRepository.getOne(command.id);
        const usersOfProject = await this.userRepository.getUsersOfProjects(command.id);
        if (usersOfProject.find(user => user.id === command.userId)) {
            throw new BadRequestException("User already exists in project");
        }
        project.users = [...usersOfProject, user]
        await this.projectRepository.save(project);
        for (const user of project.users) {
            delete user.password;
            delete user.refreshToken;
            delete user.refreshtokenexpires;
            delete user.projects;
        }
        return project;
    }
}
