/* eslint-disable prettier/prettier */

import { EventBus, EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ListDeletedEvent } from "src/list/domain/event/list-deleted.event";
import { TasksService } from "src/task/domain/task/tasks.service";

@EventsHandler(ListDeletedEvent)
export class ListDeletedHandler implements IEventHandler<ListDeletedEvent> {
    constructor(
        private readonly eventBus: EventBus,
        private readonly taskService: TasksService
    ) { }
    async handle({ id }: ListDeletedEvent): Promise<void> {
        const tasks = await this.taskService.findTasksByListId(id);
        for (const task of tasks) {
            await this.taskService.delete(task.id);
        }
        console.log('ListDeletedEvent');
    }
}
