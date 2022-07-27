/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Inject } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ListsService } from 'src/project/domain/list.service';
import { ProjectEntity } from 'src/project/domain/project.entity';
import { IProjectRepository } from 'src/project/domain/project.repository';
import { IUserRepository } from 'src/user/domain/user.repository';
import { UserCreatedEvent } from '../../../user/domain/event/user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: IUserRepository,
        @Inject('ProjectRepository')
        private readonly projectRepository: IProjectRepository,
        private readonly listService: ListsService
    ) { }
    async handle({ email }: UserCreatedEvent): Promise<void> {
        const user = await this.userRepository.findOneByEmail(email);
        const newProject = new ProjectEntity('New Project', 'This is a new project');
        await newProject.addUser(user);
        const project = await this.projectRepository.createOne(newProject);
        await this.listService.create(user.id, 'Default List', '#ff0000', project);
        console.log('UserCreatedEvent');
    }
}