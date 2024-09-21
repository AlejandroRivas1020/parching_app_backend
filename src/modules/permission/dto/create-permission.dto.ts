import { IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({ description: 'Nombre del permiso' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Permitir crear recursos', default: false })
  @IsBoolean()
  canCreate: boolean;

  @ApiProperty({ description: 'Permitir leer recursos', default: false })
  @IsBoolean()
  canRead: boolean;

  @ApiProperty({ description: 'Permitir actualizar recursos', default: false })
  @IsBoolean()
  canUpdate: boolean;

  @ApiProperty({ description: 'Permitir eliminar recursos', default: false })
  @IsBoolean()
  canDelete: boolean;

  @ApiProperty({ description: 'ID de la ruta asociada al permiso' })
  @IsString()
  pathId: string;
}
