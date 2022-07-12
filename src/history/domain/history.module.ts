/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryService } from 'src/history/domain/history.service';
import { HistoryRepository } from '../infrastructure/repository/history.repository';


@Module({
  imports: [TypeOrmModule.forFeature([HistoryRepository])],
  controllers: [],
  providers: [HistoryService]
})
export class HistoryModule { }
