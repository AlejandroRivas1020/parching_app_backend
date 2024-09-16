import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import {
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Upload IMGs') // Grupo de Swagger para "upload"
@Controller('upload')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('/image')
  @ApiOperation({ summary: 'Upload an image to Cloudinary' })
  @ApiConsumes('multipart/form-data') // Para que Swagger reconozca el tipo de dato
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
  @ApiResponse({ status: 201, description: 'Imagen subida exitosamente.' })
  @ApiResponse({ status: 500, description: 'Error subiendo la imagen.' })
  @UseInterceptors(FileInterceptor('file')) // 'file' es el nombre del campo del archivo
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const result = await this.cloudinaryService.uploadImage(file);
    return {
      imageUrl: result.url, // URL de la imagen que guardaremos en la base de datos
    };
  }
}
