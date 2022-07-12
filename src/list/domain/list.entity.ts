/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/base/base.entity';
import { ProjectEntity } from 'src/project/domain/project.entity';
import { TaskEntity } from 'src/task/domain/task/task.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'lists' })
export class ListEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    color: string;

    @ManyToOne(() => ProjectEntity, project => project.lists)
    project: ProjectEntity;

    @OneToMany(() => TaskEntity, task => task.list)
    tasks: TaskEntity[];

    @Column()
    projectId: number;
}
