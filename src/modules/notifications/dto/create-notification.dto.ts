import { IsString, IsNotEmpty, IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Notification title',
    example: 'Event Update',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Notification message',
    example: 'The event has changed...',
  })
  message: string;

  @IsUUID()
  @ApiPropertyOptional({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiProperty({
    description: 'ID of the user who owns the notification',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId: string;

  @IsBoolean()
  @ApiProperty({
    description: 'If the notification has been read',
    example: false,
  })
  isRead: boolean;
}
