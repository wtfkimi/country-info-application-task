import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs/promises';
import { AppModule } from './app.module';
import { JwtGuard } from './auth/guard/jwt.guard';
import { HttpExceptionFilter } from './infrastructure/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new JwtGuard(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  const options = new DocumentBuilder().setTitle('').setDescription('').setVersion('1.0').addTag('').build();
  const document = SwaggerModule.createDocument(app, options);
  fs.writeFile('./swagger.json', JSON.stringify(document))
    .then(() => {
      console.log('Swagger file generated');
    })
    .catch((err) => {
      console.log('Error while generating swagger file', err);
    });
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
