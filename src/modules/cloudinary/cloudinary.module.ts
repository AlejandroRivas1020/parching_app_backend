import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryService], // Exporta el servicio aquí para que otros módulos puedan usarlo
  controllers: [CloudinaryController],
})
export class CloudinaryModule {}
