/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { IGenericRepository } from "src/base/igeneric.repository";
import { ProjectEntity } from "./project.entity";

export interface IProjectRepository extends IGenericRepository<ProjectEntity> {
    getProjectsOfUser(userId: number): Promise<ProjectEntity[]>;
    findProjectById(id: number): Promise<boolean>;
    createOne(entity: ProjectEntity): Promise<ProjectEntity>;
    deleteOne(id: number): Promise<any>;
    findByName(name: string): Promise<ProjectEntity>;
    checkProjectOfUser(projectId: number, userId: number): Promise<boolean>;
    getOne(projectId: number): Promise<ProjectEntity>;
    deleteOne(id: number): Promise<ProjectEntity>;
}