/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryService } from 'src/history/history.service';
import { HistoryController } from './history.controller';
import { HistoryRepository } from './history.repository';


@Module({
  imports: [TypeOrmModule.forFeature([HistoryRepository])],
  controllers: [HistoryController],
  providers: [HistoryService]
})
export class HistoryModule { }
