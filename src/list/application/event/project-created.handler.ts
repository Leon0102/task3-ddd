/* eslint-disable prettier/prettier */
import { EventBus, EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { List } from "src/list/domain/list.aggregate";
import { ListEntity } from "src/list/domain/list.entity";
import { ListsService } from "src/list/domain/list.service";
import { ProjectCreatedEvent } from "src/project/domain/event/project-createad.event";
import { ProjectsService } from "src/project/domain/projects.service";


@EventsHandler(ProjectCreatedEvent)
export class ProjectCreatedHandler implements IEventHandler<ProjectCreatedEvent> {
    constructor(
        private readonly eventBus: EventBus,
        private readonly projectService: ProjectsService,
        private readonly listService: ListsService
    ) { }
    async handle({ id }: ProjectCreatedEvent): Promise<void> {
        const project = await this.projectService.findOneById(id);
        const newList = new ListEntity();
        newList.name = 'Default List';
        newList.color = "#ff0000";
        await this.listService.create(newList, project);
        console.log('ProjectCreatedEvent');
    }
}