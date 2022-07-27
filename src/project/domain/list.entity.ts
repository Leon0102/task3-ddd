/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/base/base.entity';
import { ProjectEntity } from 'src/project/domain/project.entity';
import { TaskEntity } from 'src/task/domain/task/task.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'lists' })
export class ListEntity extends BaseEntity {

    constructor(name: string, color: string, project: ProjectEntity, projectId: number) {
        super();
        this.name = name;
        this.color = color;
        this.projectId = projectId;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    color: string;

    @ManyToOne(() => ProjectEntity, project => project.lists, { lazy: true })
    project: Promise<ProjectEntity>;

    @OneToMany(() => TaskEntity, task => task.list)
    tasks: TaskEntity[];

    @Column()
    projectId: number;

    update(name: string, color: string): ListEntity {
        this.name = name;
        this.color = color;
        return this;
    }
}
