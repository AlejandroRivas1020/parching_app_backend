import { IsString, IsNotEmpty, IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Título de la notificación',
    example: 'Actualización de evento',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Mensaje de la notificación',
    example: 'El evento ha cambiado de fecha.',
  })
  message: string;

  @IsUUID()
  @ApiPropertyOptional({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiProperty({
    description: 'ID del usuario al que pertenece la notificación',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId: string;

  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Si la notificación ha sido leída',
    example: false,
  })
  isRead?: boolean; // Lo dejamos opcional, por si no se proporciona
}
