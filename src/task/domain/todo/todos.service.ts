/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { TodoRepository } from 'src/task/infrastructure/repository/todo.repository';
import { TodoEntity } from './todo.entity';

@Injectable()
export class TodosService {
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }
}
