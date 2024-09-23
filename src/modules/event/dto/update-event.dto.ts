import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { EventState } from '../enums/event-state.enum';
import { Transform } from 'class-transformer';

export class UpdateEventDto {
  @ApiPropertyOptional({
    description: 'Start date or time of the event',
    example: '2024-12-01T14:00:00',
  })
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'End date or time of the event',
    example: '2024-12-01T16:00:00',
  })
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  endDate?: Date;

  @ApiPropertyOptional({ type: String, example: 'closed' })
  @IsOptional()
  @IsEnum(EventState)
  state?: EventState;

  @ApiPropertyOptional({
    description: 'Maximum number of people that the event allows',
    example: 5,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  capacity?: number;

  @ApiPropertyOptional({
    description: 'Place where the event is taking place',
    example: 'Cr 31 No. 32-75, C.P 68001 Bucaramanga',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    description: 'Filled form of at least one of the respective categories',
    example: {
      name: 'hello world',
      email: 'hello.world@gmail.com',
      location: 'Cr 31 No. 32-75, C.P 68001 Bucaramanga',
    },
  })
  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  information?: Record<string, any>;
}
