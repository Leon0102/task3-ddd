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

@Entity()
export class BaseEntity {
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