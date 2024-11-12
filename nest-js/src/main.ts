import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const isProd = process.env.NODE_ENV === "production";

  // console.log("RUNNING IN PRODUCTION MODE: " + isProd);
  // console.log("JWT SECRET: " + process.env.JWT_SECRET);
  // console.log("Database URL: " + process.env.DATABASE_URL);

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix("api/v1");

  if (isProd) {
    Logger.log("LOADING PRODUCTION");
  }
  else {
    Logger.log("LOADING DEV");
    const options = new DocumentBuilder()
    .setTitle('Sword in Stone API')
    .setDescription('API for Sword in Stone')
    .setVersion('1.0')
    .addServer('http://localhost:8080/', 'Local environment')
    .addServer('https://swordinstone.com/', 'Production environment')
    .addBearerAuth()
    .build();
  
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  }

  await app.listen(8080);
}
bootstrap();
