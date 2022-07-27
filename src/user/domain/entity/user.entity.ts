/* eslint-disable prettier/prettier */
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { ProjectEntity } from 'src/project/domain/project.entity';
import { TaskEntity } from 'src/task/domain/task/task.entity';
import { BaseEntity, IBaseEntity } from 'src/base/base.entity';
import { Exclude } from 'class-transformer';
import { AggregateRoot } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { UserCreatedEvent } from '../event/user-created.event';


@Entity({ name: 'users' })
export class UserEntity extends AggregateRoot implements IBaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @ManyToMany(() => ProjectEntity, project => project.users)
    @JoinTable({ name: 'Project_Members' })
    projects: ProjectEntity[];

    @ManyToMany(() => TaskEntity, task => task.users)
    @JoinTable({ name: 'Task_Members' })
    tasks: TaskEntity[];

    @Column({ nullable: true })
    @Exclude()
    refreshToken: string;

    @Column({ nullable: true })
    @Exclude()
    refreshtokenexpires: string;

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
    emailToLowerCase(): void {
        this.email = this.email.toLowerCase();
    }


    constructor(name: string, email: string, password: string) {
        super();
        this.name = name;
        this.email = email;
        this.password = password;
        // this.apply(Object.assign(new UserCreatedEvent(this.email), this));
    }

    async setPassword(password: string) {
        this.password = await bcrypt.hash(password, 10);
    }

    async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

    async update(name: string, password: string): Promise<UserEntity> {
        this.name = name;
        this.password = await bcrypt.hash(password, 10);
        return this;
    }
    addProject() {
        // this.eventBus.publish(new UserCreatedEvent(user.email));
        // console.log('addProject');
        this.apply(Object.assign(new UserCreatedEvent(this.email), this));
    }
}
