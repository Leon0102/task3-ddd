/* eslint-disable prettier/prettier */
import { IGenericRepository } from "src/base/igeneric.repository";
import { UserEntity } from "./entity/user.entity";


export interface IUserRepository extends IGenericRepository<UserEntity> {
    checkExistEmail(email: string): Promise<boolean>;
    findOneByEmail(email: string): Promise<UserEntity | null>;
    createOne(entity: UserEntity): Promise<UserEntity>;
    updateOne(id: number, entity: UserEntity): Promise<any>;
    getUsersOfProjects(projectId: number): Promise<UserEntity[]>;
    restoreOne(id: number): Promise<any>;
    findOneUser(id: number): Promise<UserEntity | null>;
}