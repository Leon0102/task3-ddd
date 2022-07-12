/* eslint-disable prettier/prettier */
import { IGenericRepository } from "src/base/igeneric.repository";
import { TodoEntity } from "../todo/todo.entity";

export interface ITodoRepository extends IGenericRepository<TodoEntity> {
    checkExist(id: number): Promise<boolean>;
    deleteOne(id: number): Promise<any>;
    getOne(id: number): Promise<TodoEntity>;
    updateOne(id: number, entity: TodoEntity): Promise<any>;
    removeOne(todo: TodoEntity): Promise<any>;
    createOne(entity: TodoEntity): Promise<TodoEntity>;
}