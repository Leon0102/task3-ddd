/* eslint-disable prettier/prettier */
import { BadRequestException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ProjectEntity } from "src/project/domain/project.entity";
import { IProjectRepository } from "src/project/domain/project.repository";
import { IUserRepository } from "src/user/domain/user.repository";
import { RemoveUserFromProjectCommand } from "./remove-user-from-project.command";



@CommandHandler(RemoveUserFromProjectCommand)
export class RemoveUserFromProjectHandler implements ICommandHandler<RemoveUserFromProjectCommand> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly projectRepository: IProjectRepository,
    ) { }
    async execute(command: RemoveUserFromProjectCommand): Promise<ProjectEntity> {
        const project = await this.projectRepository.getOne(command.id);
        const usersOfProject = await this.userRepository.getUsersOfProjects(command.id);
        if (!usersOfProject.find(user => user.id === command.userId)) {
            throw new BadRequestException("User does not exist in project");
        }
        project.users = usersOfProject.filter(user => user.id !== command.userId);
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
