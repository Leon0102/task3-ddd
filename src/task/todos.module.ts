/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from './infrastructure/repository/todo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TodoRepository])],
  controllers: [],
  providers: [],
  // exports: [TodoRepository]
})
export class TodosModule { }
