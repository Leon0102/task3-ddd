/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { TaskRepository } from 'src/task/infrastructure/repository/task.repository';
@Injectable()
export class TasksService {
    constructor(
        private readonly taskRepository: TaskRepository,
    ) { }
    async findTasksByListId(listId: number): Promise<any> {
        return this.taskRepository.findTasksByListId(listId);
    }

    async delete(id: number): Promise<any> {
        return this.taskRepository.deleteOne(id);
    }
}
