/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ITaskRepository } from './task.repository';
@Injectable()
export class TasksService {
    constructor(
        @Inject('TaskRepository')
        private readonly taskRepository: ITaskRepository,
    ) { }

    async checkTaskOfUser(userId: number, taskId: number): Promise<boolean> {
        const isExist = await this.taskRepository.checkTaskOfUser(taskId, userId);
        return isExist;
    }
}
