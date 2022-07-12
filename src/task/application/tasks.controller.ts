/* eslint-disable prettier/prettier */
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { TasksService } from "../domain/task/tasks.service";
import { JwtAuthGuard } from "../../user/application/guards/jwt-auth.guard";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetOneTaskQuery } from "./query/get-one-task.query";
import { CreateTaskDTO } from "../domain/dto/create-task.dto";
import { CreateTaskCommand } from "./command/create-task.command";
import { CreateToDoDTO } from "../domain/dto/create-todo.dto";
import { CreateTodoCommand } from "./command/create-todo.command";
import { TransformInterceptor } from "src/interceptor/transform.interceptor";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { CreateAttachmentCommand } from "./command/create-attachment.command";
import { CreateAttachmentDTO } from "../domain/dto/create-attachment.dto";
import { CreateLabelDTO } from "../domain/dto/create-label.dto";
import { CreateLabelCommand } from "./command/create-label.command";
import { DeleteTodoCommand } from "./command/delete-todo.command";
import { DeleteAttachmentCommand } from "./command/delete-attachment.command";

@Controller('tasks')
@UseGuards(JwtAuthGuard)
// @UseFilters(new HttpExceptionFilter())
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
export class TasksController {
    constructor(
        private readonly taskService: TasksService,
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Get('/:id')
    async findById(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return await this.queryBus.execute(new GetOneTaskQuery(id));
    }

    @Post()
    async create(@Body() task: CreateTaskDTO): Promise<any> {
        return await this.commandBus.execute(new CreateTaskCommand(task.name, task.description, task.listId, task.userId));
    }

    @Post('/:id/todos')
    async createTodo(@Param('id', ParseIntPipe) id: number, @Body() todo: CreateToDoDTO): Promise<any> {
        return await this.commandBus.execute(new CreateTodoCommand(todo.name, id, todo.parentId));
    }

    @Delete('/todos/:id')
    async deleteTodo(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return await this.commandBus.execute(new DeleteTodoCommand(id));
    }

    @Post('/:id/attachments')
    @UseInterceptors(FileInterceptor('file',
        {
            storage: diskStorage({
                destination: './files',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    const ext = extname(file.originalname);
                    const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
                    cb(null, filename);
                }
            })
        }
    ))
    async createAttachment(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File, @Body() attachment: CreateAttachmentDTO): Promise<any> {
        return await this.commandBus.execute(new CreateAttachmentCommand(file.path, attachment.fileName, id));
    }

    @Delete('/attachments/:id')
    async deleteAttachment(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return await this.commandBus.execute(new DeleteAttachmentCommand(id));
    }


    @Post('/:id/labels')
    async createLabel(@Param('id', ParseIntPipe) id: number, @Body() label: CreateLabelDTO): Promise<any> {
        return await this.commandBus.execute(new CreateLabelCommand(label.title, label.color, id));
    }


}