import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { EventState } from '../enums/event-state.enum';
import { UserType } from '../enums/user-type.enum';
import { Transform } from 'class-transformer';

export class GetEventsQueryDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value, { toClassOnly: true })
  categoryId?: string;

  @IsOptional()
  @IsEnum(UserType)
  @Transform(({ value }) => value, { toClassOnly: true })
  userType?: UserType;

  @IsEnum(EventState)
  @Transform(({ value }) => value, { toClassOnly: true })
  eventsState: EventState;
}
