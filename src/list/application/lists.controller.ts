/* eslint-disable prettier/prettier */
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TransformInterceptor } from 'src/interceptor/transform.interceptor';
import { JwtAuthGuard } from 'src/user/application/guards/jwt-auth.guard';
import { CreateListDTO } from '../domain/dto/create-list.dto';
import { UpdateListDTO } from '../domain/dto/update-list.dto';
import { List } from '../domain/list.aggregate';
import { ListsService } from '../domain/list.service';
import { CreateListCommand } from './command/create-list.command';
import { DeleteListCommand } from './command/delete-list.command';
import { UpdateListCommand } from './command/update-list.command';
import { GetOneListQuery } from './query/get-one-list.query';

@Controller('lists')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ListsController {
    private REF_TYPE = 'LIST';
    constructor(
        private readonly listsService: ListsService,
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Post()
    async create(@Body() createListDTO: CreateListDTO): Promise<List> {
        return await this.commandBus.execute(new CreateListCommand(createListDTO.name, createListDTO.color, createListDTO.projectId));
    }

    @Get('/:id')
    async findById(@Req() req: any, @Param('id', ParseIntPipe) id: number): Promise<List> {
        return await this.queryBus.execute(new GetOneListQuery(id, req.user.id));
    }

    @Delete('/:id')
    async delete(@Req() req: any, @Param('id', ParseIntPipe) id: number): Promise<any> {
        return await this.commandBus.execute(new DeleteListCommand(id));
    }

    @Patch('/:id')
    async update(@Req() req: any, @Param('id', ParseIntPipe) id: number, @Body() updateListDTO: UpdateListDTO): Promise<List> {
        return await this.commandBus.execute(new UpdateListCommand(id, updateListDTO.name, updateListDTO.color));
    }
}