import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    description: 'Start date or time of the event',
    example: '2024-12-01T14:00:00',
  })
  @IsNotEmpty()
  @Transform(() => Date)
  startDate: Date;

  @ApiProperty({
    description: 'End date or time of the event',
    example: '2024-12-01T16:00:00',
  })
  @IsNotEmpty()
  @Transform(() => Date)
  endDate: Date;

  @ApiProperty({
    description: 'Maximum number of people that the event allows',
    example: 5,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  capacity: number;

  @ApiProperty({
    description: 'Place where the event is taking place',
    example: 'Cr 31 No. 32-75, C.P 68001 Bucaramanga',
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Filled form of the respective category',
  })
  @IsNotEmpty()
  @IsObject()
  information: Record<string, any>;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  categories: string[];

  @IsBoolean()
  isAdmin: boolean;

  @IsNotEmpty()
  @IsUUID()
  host?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  images: string[];
}
