import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix("api/v1");

  const options = new DocumentBuilder()
  .setTitle('Sword in Stone API')
  .setDescription('API for Sword in Stone')
  .setVersion('1.0')
  .addServer('http://localhost:8080/', 'Local environment')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(8080);
}
bootstrap();
