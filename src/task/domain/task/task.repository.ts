/* eslint-disable prettier/prettier */
import { IGenericRepository } from "src/base/igeneric.repository";
import { TaskEntity } from "../task/task.entity";

export interface ITaskRepository extends IGenericRepository<TaskEntity> {
    findOneByName(name: string): Promise<TaskEntity>;
    checkExist(id: number): Promise<boolean>;
    updateOne(id: number, entity: TaskEntity): Promise<any>;
}