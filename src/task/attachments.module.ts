/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentRepository } from './infrastructure/repository/attachment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AttachmentRepository]), MulterModule.register({ dest: './uploads' }), CqrsModule],
  controllers: [],
  providers: [],
  // exports: [AttachmentRepository]
})
export class AttachmentsModule { }
