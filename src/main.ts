import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('Test-Backend')
    .setDescription('Mobi technical test')
    .setVersion('1.0')
    .setBasePath('/api')
    .build();
  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Listening on PORT: 3000
  await app.listen(3000);
}
bootstrap();
