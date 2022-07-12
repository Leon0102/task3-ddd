/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProjectCreatedEvent } from 'src/project/domain/event/project-createad.event';
import { Project } from 'src/project/domain/project.aggregate';
import { ProjectEntity } from 'src/project/domain/project.entity';
import { ProjectsService } from 'src/project/domain/projects.service';
import { User } from 'src/user/domain/user.aggregate';
import { UsersService } from 'src/user/domain/users.service';
import { UserRepository } from 'src/user/infrastructure/repository/user.repository';
import { UserCreatedEvent } from '../../../user/domain/event/user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
    constructor(
        private readonly eventBus: EventBus,
        private readonly userRepository: UserRepository,
        private readonly projectService: ProjectsService
    ) { }
    async handle({ email }: UserCreatedEvent): Promise<void> {
        const user = await this.userRepository.findOneByEmail(email);
        const newProject = new ProjectEntity();
        newProject.name = 'Default Project';
        newProject.description = 'Default Project';
        newProject.users = [user];
        await this.projectService.create(newProject, user);
        console.log('UserCreatedEvent');
    }
}