import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {
  CreateEvent,
  GetAllEvents,
  RemoveGuest,
  Subscribe,
  UpdateEvent,
} from './docs/event';
import { GetEventsQueryDto } from './dto/get-events-query.dto';
import { SubscriptionDto } from './dto/subscription.dto';

@ApiTags('Events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @CreateEvent()
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Subscribe()
  @Post('/subscribe')
  subscribe(@Query() query: SubscriptionDto) {
    return this.eventService.subscribeTo(query.eventId, query.userId);
  }

  @GetAllEvents()
  @Get()
  findAll(@Query() query: GetEventsQueryDto, userId?: string) {
    return this.eventService.findAll(query, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @UpdateEvent()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  @RemoveGuest()
  @Delete('/guest')
  removeGuest(@Query() query: SubscriptionDto) {
    return this.eventService.unsubscribeFrom(query.eventId, query.userId);
  }
}
