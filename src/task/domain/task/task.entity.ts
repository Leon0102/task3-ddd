/* eslint-disable prettier/prettier */
import { AttachmentEntity } from '../attachment/attachment.entity';
import { LabelEntity } from '../label/label.entity';
import { ListEntity } from 'src/project/domain/list.entity';
import { UserEntity } from 'src/user/domain/entity/user.entity';
import { TodoEntity } from '../todo/todo.entity';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { BaseEntity, IBaseEntity } from 'src/base/base.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { Exclude } from 'class-transformer';

export enum Priority {
    HIGH = 'High',
    MEDIUM = 'Medium',
    LOW = 'Low'
}


@Entity({ name: 'tasks' })
export class TaskEntity extends AggregateRoot implements IBaseEntity {

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

    @Column({ nullable: true })
    DueDate: Date;

    @Column()
    description: string;

    @Column({ nullable: true })
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

    @ManyToMany(() => UserEntity, user => user.tasks, { cascade: true, lazy: true })
    users: UserEntity[];

    @ManyToMany(() => LabelEntity, label => label.tasks)
    @JoinTable({ name: "Label_Tasks" })
    labels: LabelEntity[];

    @CreateDateColumn()
    @Exclude()
    createdAt: Date = new Date();

    @UpdateDateColumn()
    @Exclude()
    updatedAt: Date = new Date();

    @DeleteDateColumn()
    @Exclude()
    deletedAt: Date;

    @VersionColumn()
    @Exclude()
    version = 0;

    @BeforeUpdate()
    updateVersion() {
        this.version++;
    }

    @BeforeInsert()
    setDefaultPriority(): void {
        this.priority = Priority.LOW;
    }

    @BeforeInsert()
    setDefaultDueDate(): void {
        this.DueDate = new Date();
        this.DueDate.setDate(this.DueDate.getDate() + 7);
    }

    constructor(name: string, description: string, listId: number, userId: number) {
        super();
        this.name = name;
        this.description = description;
        this.listId = listId;
        this.userId = userId;
    }

    updateTask(userId: number,
        id: number,
        name: string,
        description: string,
        priority: Priority,
        DueDate: Date,
    ) {
        this.userId = userId;
        this.id = id;
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.DueDate = DueDate;
    }



    async addUser(user: UserEntity) {
        (await this.users).push(user);
    }

    async removeUser(user: UserEntity) {
        for (let i = 0; i < (await this.users).length; i++) {
            if ((await this.users)[i].id === user.id) {
                (await this.users).splice(i, 1);
            }
        }
    }
    assignLabel(label: LabelEntity) {
        (this.labels).push(label);
    }

    async removeLabel(label: LabelEntity) {
        for (let i = 0; i < (await this.labels).length; i++) {
            if ((await this.labels)[i].id === label.id) {
                (await this.labels).splice(i, 1);
            }
        }
    }
}
