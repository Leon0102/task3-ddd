/* eslint-disable prettier/prettier */
export interface IGenericRepository<T> {
    findAll(): Promise<T[]>;
    getOne(id: number): Promise<T>;
    checkExist(id: number): Promise<boolean>;
    updateOne(id: number, entity: T): Promise<any>;
    save(entity: T): Promise<T>;
    deleteOne(id: number): Promise<T>;
}