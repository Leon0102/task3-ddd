/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';

import { History } from '../../domain/history.entity';

@EntityRepository(History)
export class HistoryRepository extends Repository<History> {
}