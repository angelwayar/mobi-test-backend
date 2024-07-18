import { Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { imageFileFilter } from 'src/core/utils/file-filter.util';
import { FileService } from './file.service';

@ApiTags('File')
@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) { }
    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'The file has been upload successfully.',
    })
    @ApiResponse({ status: 404, description: 'Not Found.' })
    @UseInterceptors(FileInterceptor('file', { fileFilter: imageFileFilter }))
    async upload(@UploadedFile() file: Express.Multer.File) {

        await this.fileService.upload(file.originalname, file.buffer);
    }

    @Get(':page/:limit')
    async findAll(@Param('page') page: number, @Param('limit') limit: number) {
        return await this.fileService.getAll(page, limit);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.fileService.getOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.fileService.deleteOne(id);
    }
}