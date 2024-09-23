import { IsOptional, IsEnum, IsUUID } from 'class-validator';
import { EventState } from '../enums/event-state.enum';
import { UserType } from '../enums/user-type.enum';
import { Transform } from 'class-transformer';

export class GetEventsQueryDto {
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsEnum(UserType)
  @Transform(({ value }) => value, { toClassOnly: true })
  userType?: UserType;

  @IsOptional()
  @IsEnum(EventState)
  @Transform(({ value }) => value, { toClassOnly: true })
  eventsState?: EventState;
}
