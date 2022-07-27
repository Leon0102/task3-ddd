/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';

import { HistoryEntity } from './history.entity';

@EntityRepository(HistoryEntity)
export class HistoryRepository extends Repository<HistoryEntity> {
    async createHistory(history: HistoryEntity): Promise<HistoryEntity> {
        return await this.save(history);
    }
}