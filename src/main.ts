import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Prefijo global para los endpoints

  app.enableCors({
    origin: 'https://your-frontend-domain.com', // Reemplaza con el dominio de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('ParchingApp Documentation')
    .setDescription(
      'API para gestionar notificaciones y subir imágenes usando Cloudinary',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // La documentación en /api/docs

  // Configuración global de validación
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Inicialización de la aplicación
  const logger = new Logger('Bootstrap');
  const port = 3000;
  await app.listen(port);
  logger.log(`Application is running on port ${port}`);
  logger.log(
    `Swagger documentation available at http://localhost:${port}/api/docs`,
  );
}
bootstrap();
