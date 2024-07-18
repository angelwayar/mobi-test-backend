import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './modules/files/file.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    FileModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb+srv://test:test-123@test.sf4gqyf.mongodb.net/?retryWrites=true&w=majority&appName=test'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
