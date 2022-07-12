/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabelService } from './domain/label/label.service';
import { LabelRepository } from './infrastructure/repository/label.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LabelRepository])],
  controllers: [],
  providers: [LabelService],
  exports: [LabelService]
})
export class LabelModule { }
