/* eslint-disable prettier/prettier */
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectEntity } from 'src/project/domain/project.entity';
import { TaskEntity } from 'src/task/domain/task/task.entity';
import { BaseEntity } from 'src/base/base.entity';
import { Exclude } from 'class-transformer';
import { Inject } from '@nestjs/common';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {

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
    @JoinTable()
    projects: ProjectEntity[];

    @ManyToMany(() => TaskEntity, task => task.users)
    @JoinTable()
    tasks: TaskEntity[];

    @Column({ nullable: true })
    @Exclude()
    refreshToken: string;

    @Column({ nullable: true })
    @Exclude()
    refreshtokenexpires: string;

    @BeforeInsert()
    emailToLowerCase(): void {
        this.email = this.email.toLowerCase();
    }


}
