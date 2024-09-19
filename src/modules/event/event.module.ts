import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { Event } from './entities/event.entity';
import { EventImage } from './entities/event-image.entity';
import { EventCategory } from './entities/event-category.entity';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { Category } from '../category/entities';
import { EventUser } from './entities/event-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Event,
      EventImage,
      EventCategory,
      User,
      Category,
      EventUser,
    ]),
    UserModule,
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
