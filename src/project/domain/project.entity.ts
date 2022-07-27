/* eslint-disable prettier/prettier */
// import { List } from 'src/modules/lists/model/list.entity';
import { UserEntity } from 'src/user/domain/entity/user.entity';
import { ListEntity } from 'src/project/domain/list.entity';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { BaseEntity, IBaseEntity } from 'src/base/base.entity';
import { Exclude } from 'class-transformer';
import { AggregateRoot } from '@nestjs/cqrs';

@Entity({ name: 'projects' })
export class ProjectEntity extends AggregateRoot implements IBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    name: string;

    @OneToMany(() => ListEntity, list => list.project)
    lists: ListEntity[];

    @ManyToMany(() => UserEntity, user => user.projects, { cascade: true, lazy: true })
    users: Promise<UserEntity[]>;

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

    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
    }

    async addUser(user: UserEntity) {
        (await this.users).push(user);
    }

    async removeUser(user: UserEntity) {
        for (let i = 0; i < (await this.users).length; i++) {
            if ((await this.users)[i].id === user.id) {
                (await this.users).splice(i, 1);
                break;
            }
        }
    }

    update(name: string, description: string): ProjectEntity {
        this.name = name;
        this.description = description;
        return this;
    }
}
