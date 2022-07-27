/* eslint-disable prettier/prettier */
import { BadRequestException, Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { HistoryService } from "src/history/history.service";
import { ProjectEntity } from "src/project/domain/project.entity";
import { IProjectRepository } from "src/project/domain/project.repository";
import { IUserRepository } from "src/user/domain/user.repository";
import { RemoveUserFromProjectCommand } from "./remove-user-from-project.command";



@CommandHandler(RemoveUserFromProjectCommand)
export class RemoveUserFromProjectHandler implements ICommandHandler<RemoveUserFromProjectCommand> {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository,
        @Inject('ProjectRepository')
        private readonly projectRepository: IProjectRepository,
        private readonly historyService: HistoryService,
    ) { }
    async execute(command: RemoveUserFromProjectCommand) {
        if (!await this.projectRepository.checkProjectOfUser(command.id, command.userCreatedId)) {
            throw new NotFoundException('Project not found');
        }
        const project = await this.projectRepository.getOne(command.id);
        if ((await project.users).length === 1) {
            throw new BadRequestException('You cannot remove the last user from a project');
        }
        const usersOfProject = await this.userRepository.getUsersOfProjects(command.id);
        if (!usersOfProject.find(user => user.id === command.userId)) {
            throw new BadRequestException("User does not exist in project");
        }
        const user = await this.userRepository.getOne(command.userId);
        await project.removeUser(user);
        await this.projectRepository.saveOne(project);
        await this.historyService.createHistory("Remove User from Project", `Remove user ${command.userId} from project ${project.id}`, JSON.stringify(project), command.userCreatedId, "PROJECT", project.id);
    }
}
