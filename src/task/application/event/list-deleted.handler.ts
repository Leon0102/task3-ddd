/* eslint-disable prettier/prettier */
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ListDeletedEvent } from "src/project/domain/event/list-deleted.event";
import { Inject } from "@nestjs/common";
import { ITaskRepository } from "src/task/domain/task/task.repository";

@EventsHandler(ListDeletedEvent)
export class ListDeletedHandler implements IEventHandler<ListDeletedEvent> {
    constructor(
        @Inject('TaskRepository')
        private readonly taskRepository: ITaskRepository,
    ) { }
    async handle({ id }: ListDeletedEvent): Promise<void> {
        const tasks = await this.taskRepository.findTasksByListId(id);
        for (const task of tasks) {
            await this.taskRepository.deleteOne(task.id);
        }
        console.log('ListDeletedEvent');
    }
}