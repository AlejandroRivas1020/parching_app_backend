import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventImage } from './entities/event-image';
import { EventCategory } from './entities/event-category';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { Category } from '../category/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Event,
      EventImage,
      EventCategory,
      User,
      Category,
    ]),
    UserModule,
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
