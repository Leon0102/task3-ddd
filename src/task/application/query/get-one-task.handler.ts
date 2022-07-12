/* eslint-disable prettier/prettier */

import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TaskEntity } from "src/task/domain/task/task.entity";
import { TaskRepository } from "src/task/infrastructure/repository/task.repository";
import { GetOneTaskQuery } from "./get-one-task.query";


@QueryHandler(GetOneTaskQuery)
export class GetOneTaskHandler implements IQueryHandler<GetOneTaskQuery> {
    constructor(
        private readonly taskRepository: TaskRepository,
    ) { }

    async execute(query: GetOneTaskQuery): Promise<TaskEntity> {
        const task = await this.taskRepository.getOne(query.getId());
        if (!task) {
            throw new NotFoundException(`Task with id ${query.getId()} not found`);
        }
        return task;
    }
}
