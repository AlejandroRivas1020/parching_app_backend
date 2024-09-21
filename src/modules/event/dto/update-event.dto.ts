import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import { EventState } from '../enums/event-state.enum';
import { IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @ApiPropertyOptional({ type: String, example: 'closed' })
  @IsEnum(EventState)
  state?: EventState;
}
