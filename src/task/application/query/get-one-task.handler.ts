/* eslint-disable prettier/prettier */

import { Inject, NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TaskEntity } from "src/task/domain/task/task.entity";
import { ITaskRepository } from "src/task/domain/task/task.repository";
import { TasksService } from "src/task/domain/task/tasks.service";
import { GetOneTaskQuery } from "./get-one-task.query";


@QueryHandler(GetOneTaskQuery)
export class GetOneTaskHandler implements IQueryHandler<GetOneTaskQuery> {
    constructor(
        @Inject('TaskRepository')
        private readonly taskRepository: ITaskRepository,
        private taskService: TasksService,
    ) { }

    async execute(query: GetOneTaskQuery): Promise<TaskEntity> {
        if (!await this.taskRepository.checkExist(query.id)) {
            throw new NotFoundException(`Task with id ${query.id} not found`);
        }
        const task = await this.taskRepository.getTaskAndUsers(query.id);
        if (!await this.taskService.checkTaskOfUser(query.userId, task.id)) {
            throw new NotFoundException('Task not found');
        }
        for (const todo of task.todos) {
            if (todo.parentId == null) {
                todo['children'] = [];
                for (const child of task.todos) {
                    if (child.parentId == todo.id) {
                        todo['children'].push(child);
                    }
                }
            }
        }
        task.todos = task.todos.filter(t => t.parentId === null);
        if (!task) {
            throw new NotFoundException(`Task with id ${query.id} not found`);
        }
        return task;
    }
}
