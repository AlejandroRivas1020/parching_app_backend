import { IsUUID } from 'class-validator';

export class SubscriptionDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  eventId: string;
}
