/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryRepository } from 'src/history/infrastructure/repository/history.repository';
import { Repository } from 'typeorm';
// import { CreateHistoryDTO } from './model/dto/create-history.dto';
// import { History } from './model/history.entity';

@Injectable()
export class HistoryService {
    constructor(
        private readonly hisRepository: HistoryRepository,
    ) { }

    // async createHistory(action, message, contentJSON, createdById, refType, refId): Promise<History> {
    //     const newHistory = new History();
    //     switch (action) {
    //         case 'POST':
    //             newHistory.action = 'create';
    //             break;
    //         case 'PATCH':
    //             newHistory.action = 'update';
    //             break;
    //         case 'DELETE':
    //             newHistory.action = 'delete';
    //             break;
    //         default:
    //             newHistory.action = null;
    //             break;
    //     }
    //     newHistory.contentJSON = contentJSON;
    //     newHistory.message = message;
    //     newHistory.createdById = createdById;
    //     newHistory.refType = refType;
    //     newHistory.refId = refId;
    //     return this.hisRepository.save(newHistory);
    // }

    // async getAllHistory(): Promise<History[]> {
    //     return this.hisRepository.find();
    // }

    // async getAllHistoryByUser(userId: number): Promise<History[] | any> {
    //     try {
    //         return this.hisRepository.find({ where: { createdById: userId } });
    //     } catch (error) {
    //         throw new NotFoundException('History not found')
    //     }
    // }

    // async getAllHistoryByRefType(refType: string, userId: number): Promise<History[] | any> {
    //     switch (refType) {
    //         case 'projects':
    //             return this.hisRepository.find({ where: { refType: 'PROJECT', createdById: userId } });
    //         case 'lists':
    //             return this.hisRepository.find({ where: { refType: 'LIST', createdById: userId } });
    //         case 'tasks':
    //             return this.hisRepository.find({ where: { refType: 'TASK', createdById: userId } });
    //         case 'todos':
    //             return this.hisRepository.find({ where: { refType: 'TODO', createdById: userId } });
    //         case 'labels':
    //             return this.hisRepository.find({ where: { refType: 'LABEL', createdById: userId } });
    //         case 'attachments':
    //             return this.hisRepository.find({ where: { refType: 'ATTACHMENT', createdById: userId } });
    //         default:
    //             throw new NotFoundException('History not found')
    //     }
    // }
}
