/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import { Exclude } from 'class-transformer';
import {
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';

export interface IBaseEntity {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    version: number;
}


@Entity()
export class BaseEntity implements IBaseEntity {
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
}