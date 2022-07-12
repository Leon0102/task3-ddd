/* eslint-disable prettier/prettier */
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LabelEntity } from '../../domain/label/label.entity';
import { LabelRepository } from 'src/task/infrastructure/repository/label.repository';

@Injectable()
export class LabelService {
    constructor(
        private readonly labelRepository: LabelRepository
    ) { }


    // async getAll(): Promise<Label[]> {
    //     return this.labelRepository.find();
    // }

    // async createLabel(createLabel: CreateLabelDTO): Promise<Label> {
    //     const newLabel = new Label();
    //     newLabel.title = createLabel.title;
    //     newLabel.color = createLabel.color;
    //     return this.labelRepository.save(newLabel);
    // }

    // async deleteLabel(id: number): Promise<any> {
    //     const label = await this.labelRepository.findOne(id);
    //     if (!label) {
    //         throw new NotFoundException('Label not found');
    //     }
    //     else {
    //         return this.labelRepository.remove(label);
    //     }
    // }

    // async updateLabelToTask(id: number, updateLabel: updateLabelToTaskDTO): Promise<any> {
    //     const label = await this.labelRepository.findOne(id);
    //     const task = await this.taskService.getTask(updateLabel.taskId);
    //     console.log(task);
    //     if (!label) {
    //         throw new NotFoundException('Label not found');

    //     }
    //     else {
    //         return this.taskService.updateTaskLabel(updateLabel.taskId, label);
    //     }
    // }

    // async getLabelsOfTask(taskId: number): Promise<Label[]> {
    //     const labels = await this.labelRepository.createQueryBuilder('label')
    //         .leftJoinAndSelect('label.tasks', 'task')
    //         .where('task.id = :taskId', { taskId })
    //         .getMany();
    //     return labels;
    // }

    // async deleteLabelsByTaskId(taskId: number): Promise<any> {
    //     const labels = await this.labelRepository.createQueryBuilder('label')
    //         .leftJoinAndSelect('label.tasks', 'task')
    //         .where('task.id = :taskId', { taskId })
    //         .getMany();
    //     return this.labelRepository.remove(labels);
    // }
}
