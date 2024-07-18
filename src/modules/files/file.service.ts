import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import generateObjectId from "src/core/utils/generate_id.util";
import { CreateFileDto, ResponseFileDto } from "./dto/file.dto";
import { File } from "./schemas/file.schema";
import urlFormating from "./utils/url_formating.util";




@Injectable()
export class FileService {
    private readonly s3Cliente = new S3Client({
        region: this.configService.getOrThrow('AWS_S3_REGION'),
        credentials: {
            accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
            secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY')
        }
    });

    constructor(
        private readonly configService: ConfigService,
        @InjectModel(File.name) private fileModel: Model<File>
    ) { }

    // Se esta subiendo un archivo 
    async upload(fileName: string, file: Buffer) {
        try {
            const command = new PutObjectCommand({
                Bucket: this.configService.getOrThrow('AWS_BUCKET_NAME'),
                Key: fileName,
                Body: file,
            });

            await this.s3Cliente.send(command);

            const createdFile = new this.fileModel(
                CreateFileDto.fromFormData(
                    fileName,
                    urlFormating(
                        this.configService.getOrThrow('AWS_BUCKET_NAME'),
                        this.configService.getOrThrow('AWS_S3_REGION'),
                        fileName
                    ),
                ));
            return createdFile.save();

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getAll(page: number = 0, limit: number = 10) {
        try {
            const count = await this.fileModel.countDocuments({}).exec();
            const page_total = Math.floor((count - 1) / limit) + 1;
            const files = await this.fileModel.find().limit(limit).skip(page).exec();
            const filesFormatted = [];

            files.forEach((img) => {
                filesFormatted.push(
                    ResponseFileDto.fromObjectToData(
                        img._id.toString(),
                        img.name,
                        img.url
                    )
                );
            });

            return {
                data: filesFormatted,
                page_total: page_total,
            };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getOne(id: string) {
        try {
            const file = await this.fileModel.findOne({ _id: generateObjectId(id) });

            return ResponseFileDto.fromObjectToData(
                file._id.toString(),
                file.name,
                file.url
            )
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteOne(id: string) {
        try {
            const file = await this.fileModel.findOne({ _id: generateObjectId(id) });
            const command = new DeleteObjectCommand({
                Bucket: this.configService.getOrThrow('AWS_BUCKET_NAME'),
                Key: file.name
            });

            await this.s3Cliente.send(command);
            await this.fileModel.deleteOne({ _id: generateObjectId(id) });

            return { message: 'File deletes successfully' };

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}