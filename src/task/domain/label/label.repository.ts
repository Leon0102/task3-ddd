/* eslint-disable prettier/prettier */
import { IGenericRepository } from "src/base/igeneric.repository";
import { LabelEntity } from "../../domain/label/label.entity";

export interface ILabelRepository extends IGenericRepository<LabelEntity> {
    checkExist(id: number): Promise<boolean>;
    getLabelByProjectId(projectId: number): Promise<LabelEntity[]>;
    createOne(entity: LabelEntity): Promise<LabelEntity>;
    getLabelsOfTask(taskId: number): Promise<LabelEntity[]>;
}