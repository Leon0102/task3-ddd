/* eslint-disable prettier/prettier */
import { TaskEntity } from '../task/task.entity';

import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/base/base.entity';

@Entity({ name: 'attachments' })
export class AttachmentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fileName: string;

    @ManyToOne(() => TaskEntity, task => task.attachments)
    task: TaskEntity;

    @Column()
    taskId: number;

    @Column({ nullable: true })
    storageURL: string;
}
