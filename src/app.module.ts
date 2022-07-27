/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './database/ormconfig';
import { HistoryModule } from './history/history.module';
import { ListsModule } from './project/lists.module';
import { ProjectsModule } from './project/projects.module';
import { AttachmentsModule } from './task/attachments.module';
import { LabelModule } from './task/label.module';
import { TasksModule } from './task/tasks.module';
import { TodosModule } from './task/todos.module';
import { AuthModule } from './user/auth.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRoot(typeOrmConfig), UsersModule, AuthModule, ProjectsModule, TasksModule, ListsModule, TodosModule, LabelModule, AttachmentsModule, HistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
