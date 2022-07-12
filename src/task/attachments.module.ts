/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentsService } from './domain/attachment/attachments.service';
import { AttachmentRepository } from './infrastructure/repository/attachment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AttachmentRepository]), MulterModule.register({ dest: './uploads' })],
  controllers: [],
  providers: [AttachmentsService, Object]
})
export class AttachmentsModule { }
