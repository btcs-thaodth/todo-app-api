import { NestFactory } from '@nestjs/core';

import { AppModule } from 'src/app.module';
import { AppConfigService } from 'src/configs/app/config.service';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));
  const config = new DocumentBuilder()
    .setTitle('Todo app')
    .setDescription('The todo app API description')
    .setVersion('1.0')
    .addTag('todo')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const appConfig: AppConfigService = app.get(AppConfigService);

  // console.log(appConfig.port);
  await app.listen(appConfig.port);
}
bootstrap();
