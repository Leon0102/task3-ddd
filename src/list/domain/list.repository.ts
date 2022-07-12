/* eslint-disable prettier/prettier */
import { IGenericRepository } from "src/base/igeneric.repository";
import { ListEntity } from "./list.entity";

export interface IListRepository extends IGenericRepository<ListEntity> {
    checkExist(id: number): Promise<boolean>;
    getListByProjectId(projectId: number): Promise<ListEntity[]>;
    getListAndTasks(listId: number): Promise<ListEntity>;
    createOne(entity: ListEntity): Promise<ListEntity>;
}