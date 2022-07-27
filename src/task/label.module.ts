/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabelRepository } from './infrastructure/repository/label.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LabelRepository])],
  controllers: [],
  providers: [],
  // exports: [LabelRepository]
})
export class LabelModule { }
