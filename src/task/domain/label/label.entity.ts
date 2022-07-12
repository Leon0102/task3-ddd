/* eslint-disable prettier/prettier */

import { TaskEntity } from "../task/task.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "src/base/base.entity";

@Entity({ name: 'labels' })
export class LabelEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    color: string;

    @ManyToMany(() => TaskEntity, task => task.labels, { cascade: true })
    tasks: TaskEntity[];
}
