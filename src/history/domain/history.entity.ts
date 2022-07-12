/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/base/base.entity';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'history' })
export class History extends BaseEntity {
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
    createdAt: Date;

    @Column()
    createdById: number;

    @BeforeInsert()
    setCreatedAt() {
        this.createdAt = new Date();
    }
}
