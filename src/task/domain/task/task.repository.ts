/* eslint-disable prettier/prettier */
import { IGenericRepository } from "src/base/igeneric.repository";
import { TaskEntity } from "../task/task.entity";

export interface ITaskRepository extends IGenericRepository<TaskEntity> {
    checkExist(id: number): Promise<boolean>;
    updateOne(id: number, entity: TaskEntity): Promise<any>;
    findTasksByListId(listId: number): Promise<TaskEntity[]>;
    getTaskAndUsers(taskId: number): Promise<TaskEntity>;
    findOneTaskById(taskId: number): Promise<TaskEntity>;
    checkTaskOfUser(userId: number, taskId: number): Promise<any>;
    CheckLabelOfTask(taskId: number, labelId: number): Promise<any>;
}