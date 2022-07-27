/* eslint-disable prettier/prettier */
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "../../user/application/guards/jwt-auth.guard";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetOneTaskQuery } from "./query/get-one-task.query";
import { CreateTaskDTO } from "../domain/dto/create-task.dto";
import { CreateTaskCommand } from "./command/create-task.command";
import { CreateToDoDTO } from "../domain/dto/create-todo.dto";
import { CreateTodoCommand } from "./command/create-todo.command";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { CreateAttachmentCommand } from "./command/create-attachment.command";
import { CreateAttachmentDTO } from "../domain/dto/create-attachment.dto";
import { CreateLabelDTO } from "../domain/dto/create-label.dto";
import { CreateLabelCommand } from "./command/create-label.command";
import { DeleteTodoCommand } from "./command/delete-todo.command";
import { DeleteAttachmentCommand } from "./command/delete-attachment.command";
import { RemoveLabelFromTaskCommand } from "./command/remove-label-from-task.command";
import { UpdateTaskCommand } from "./command/update-task.command";
import { UpdateTaskDTO } from "../domain/dto/update-task.dto";
import { AssignUserToTaskCommand } from "./command/assign-user-to-task.command";
import { RemoveUserFromTaskCommand } from "./command/remove-user-from-task.command";
import { DeleteTaskCommand } from "./command/delete-task.command";
import { AssignLabelToTaskCommand } from "./command/assign-label-to-task.command";

@Controller('tasks')
@UseGuards(JwtAuthGuard)
// @UseFilters(new HttpExceptionFilter())
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
export class TasksController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) { }

    @Get('/:id')
    async findById(@Req() req: any, @Param('id', ParseIntPipe) id: number): Promise<any> {
        return await this.queryBus.execute(new GetOneTaskQuery(id, req.user.id));
    }

    @Delete('/:id')
    async delete(@Req() req: any, @Param('id', ParseIntPipe) id: number): Promise<any> {
        return await this.commandBus.execute(new DeleteTaskCommand(req.user.id, id));
    }


    @Patch('/:id/users')
    async assignUsertoTask(@Req() req: any, @Param('id') id: number, @Body('userId') userId: number): Promise<any> {
        return await this.commandBus.execute(new AssignUserToTaskCommand(req.user.id, userId, id));
    }

    @Delete('/:id/users')
    async removeUserFromTask(@Req() req: any, @Param('id') id: number, @Body('userId') userId: number): Promise<any> {
        return await this.commandBus.execute(new RemoveUserFromTaskCommand(req.user.id, userId, id));
    }

    @Post()
    async create(@Req() req: any, @Body() task: CreateTaskDTO): Promise<any> {
        return await this.commandBus.execute(new CreateTaskCommand(task.name, task.description, task.listId, req.user.id));
    }

    @Patch('/:id')
    async update(@Req() req: any, @Param('id', ParseIntPipe) id: number, @Body() task: UpdateTaskDTO): Promise<any> {
        return await this.commandBus.execute(new UpdateTaskCommand(req.user.id, id, task.name, task.description, task.priority, task.DueDate));
    }

    @Post('/:id/todos')
    async createTodo(@Req() req: any, @Param('id', ParseIntPipe) id: number, @Body() todo: CreateToDoDTO): Promise<any> {
        return await this.commandBus.execute(new CreateTodoCommand(req.user.id, todo.name, id, todo.parentId));
    }

    @Delete('/todos/:id')
    async deleteTodo(@Req() req: any, @Param('id', ParseIntPipe) id: number): Promise<any> {
        return await this.commandBus.execute(new DeleteTodoCommand(req.user.id, id));
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
    async createAttachment(@Req() req: any, @Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File, @Body() attachment: CreateAttachmentDTO): Promise<any> {
        return await this.commandBus.execute(new CreateAttachmentCommand(req.user.id, file.path, attachment.fileName, id));
    }

    @Delete('/attachments/:id')
    async deleteAttachment(@Req() req: any, @Param('id', ParseIntPipe) id: number): Promise<any> {
        return await this.commandBus.execute(new DeleteAttachmentCommand(req.user.id, id));
    }


    @Post('/labels')
    async createLabel(@Req() req: any, @Param('id', ParseIntPipe) id: number, @Body() label: CreateLabelDTO): Promise<any> {
        return await this.commandBus.execute(new CreateLabelCommand(req.user.id, label.title, label.color));
    }

    @Post('/:id/labels')
    async assignLabelToTask(@Req() req: any, @Param('id', ParseIntPipe) id: number, @Body('labelId') labelId: number): Promise<any> {
        return await this.commandBus.execute(new AssignLabelToTaskCommand(req.user.id, labelId, id));
    }

    @Delete(':id/labels')
    async deleteLabel(@Req() req: any, @Param('id', ParseIntPipe) id: number, @Body('labelId') labelId: number): Promise<any> {
        return await this.commandBus.execute(new RemoveLabelFromTaskCommand(req.user.id, id, labelId));
    }
}