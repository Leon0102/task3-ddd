/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryRepository } from 'src/history/history.repository';
import { Repository } from 'typeorm';
import { HistoryEntity } from 'src/history/history.entity';
// import { CreateHistoryDTO } from './model/dto/create-history.dto';
// import { History } from './model/history.entity';

@Injectable()
export class HistoryService {
    constructor(
        private readonly hisRepository: HistoryRepository,
    ) { }

    async createHistory(action, message, contentJSON, createdById, refType, refId): Promise<HistoryEntity> {
        const newHistory = new HistoryEntity();
        newHistory.action = action;
        newHistory.contentJSON = contentJSON;
        newHistory.message = message;
        newHistory.createdById = createdById;
        newHistory.refType = refType;
        newHistory.refId = refId;
        return this.hisRepository.createHistory(newHistory);
    }

    // async getAllHistory(): Promise<History[]> {
    //     return this.hisRepository.find();
    // }

    async getAllHistoryByUser(userId: number): Promise<History[] | any> {
        try {
            return this.hisRepository.find({ where: { createdById: userId } });
        } catch (error) {
            throw new NotFoundException('History not found')
        }
    }
}
