/* eslint-disable prettier/prettier */
import { TaskEntity } from '../task/task.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/base/base.entity';

@Entity({ name: 'todos' })
export class TodoEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: false })
    isDone: boolean;

    @ManyToOne(() => TaskEntity, task => task.todos)
    task: TaskEntity;

    @Column()
    taskId: number;

    @Column({ nullable: true })
    parentId: number;
}
