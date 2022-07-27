/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/base/base.entity';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'history' })
export class HistoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    action: string;

    @Column({ nullable: true })
    refType: string;

    @Column({ nullable: true })
    refId: number;

    @Column({ nullable: true })
    message: string;

    @Column({ nullable: true })
    contentJSON: string;

    @Column()
    createdById: number;
}
