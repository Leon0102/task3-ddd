/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from 'src/task/domain/todo/todos.service';
import { TodoRepository } from './infrastructure/repository/todo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TodoRepository])],
  controllers: [],
  providers: [TodosService]
})
export class TodosModule { }
