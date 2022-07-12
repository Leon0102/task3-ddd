/* eslint-disable prettier/prettier */
// import { List } from 'src/modules/lists/model/list.entity';
import { UserEntity } from 'src/user/domain/entity/user.entity';
import { ListEntity } from 'src/list/domain/list.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/base/base.entity';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    name: string;

    @OneToMany(() => ListEntity, list => list.project)
    lists: ListEntity[];

    @ManyToMany(() => UserEntity, user => user.projects, { cascade: true })
    users: UserEntity[];
}
