/* eslint-disable prettier/prettier */
import { EventBus, EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ListsService } from "src/list/domain/list.service";
import { ProjectDeletedEvent } from "src/project/domain/event/project-deleted.event";
import { ProjectsService } from "src/project/domain/projects.service";


@EventsHandler(ProjectDeletedEvent)
export class ProjectDeletedHandler implements IEventHandler<ProjectDeletedEvent> {
    constructor(
        private readonly eventBus: EventBus,
        private readonly projectService: ProjectsService,
        private readonly listService: ListsService
    ) { }
    async handle({ id }: ProjectDeletedEvent): Promise<void> {
        const lists = await this.listService.findListsByProjectId(id);
        for (const list of lists) {
            await this.listService.delete(list.id);
        }
        console.log('ProjectDeletedEvent');
    }
}