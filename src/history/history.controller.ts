/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/application/guards/jwt-auth.guard';
import { HistoryService } from './history.service';

@Controller('history')
@UseGuards(JwtAuthGuard)
export class HistoryController {
    constructor(
        private readonly historyService: HistoryService,
    ) { }


    @Get()
    async getAllHistory(@Req() req: any): Promise<any> {
        return this.historyService.getAllHistoryByUser(req.user.id);
    }
}
