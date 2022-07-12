/* eslint-disable prettier/prettier */
import { AttachmentEntity } from '../attachment/attachment.entity';
import { LabelEntity } from '../label/label.entity';
import { ListEntity } from 'src/list/domain/list.entity';
import { UserEntity } from 'src/user/domain/entity/user.entity';
import { TodoEntity } from '../todo/todo.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/base/base.entity';

export enum Priority {
    HIGH = 'High',
    MEDIUM = 'Medium',
    LOW = 'Low'
}


@Entity({ name: 'tasks' })
export class TaskEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: Priority,
        default: Priority.LOW
    })
    priority: Priority;

    @Column()
    DueDate: Date;

    @Column()
    description: string;

    @Column()
    userId: number;

    @ManyToOne(() => ListEntity, list => list.tasks)
    list: ListEntity;

    @OneToMany(() => TodoEntity, todo => todo.task)
    todos: TodoEntity[];

    @OneToMany(() => AttachmentEntity, att => att.task)
    attachments: AttachmentEntity[];

    @Column()
    listId: number;

    @Column({ default: false })
    isDone: boolean;

    @ManyToMany(() => UserEntity, user => user.tasks, { cascade: true })
    users: UserEntity[];

    @ManyToMany(() => LabelEntity, label => label.tasks)
    @JoinTable()
    labels: LabelEntity[];

    @BeforeInsert()
    setDefaultPriority(): void {
        this.priority = Priority.LOW;
    }

    @BeforeInsert()
    setDefaultDueDate(): void {
        this.DueDate = new Date();
        this.DueDate.setDate(this.DueDate.getDate() + 7);
    }
}
