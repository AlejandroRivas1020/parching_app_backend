import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventImage } from './entities/event-image';
import { EventCategory } from './entities/event-category';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventImage, EventCategory])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
