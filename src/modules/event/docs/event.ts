import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { UserType } from '../enums/user-type.enum';
import { EventState } from '../enums/event-state.enum';

export function CreateEvent() {
  return applyDecorators(
    ApiOperation({ summary: 'Create an event' }),
    ApiResponse({ status: 200, description: 'Event created' }),
    ApiBody({ type: CreateEventDto }),
  );
}

export function GetAllEvents() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all events and apply filter' }),
    ApiQuery({
      required: false,
      type: String,
      description: 'ID of the category to search events by',
      name: 'categoryId',
    }),
    ApiQuery({
      enum: UserType,
      required: false,
      description: 'Role of the user in searching events',
      name: 'userType',
    }),
    ApiQuery({
      enum: EventState,
      description: 'Event state to filter by',
      required: true,
      name: 'eventsState',
    }),
  );
}

export function UpdateEvent() {
  return applyDecorators(
    ApiOperation({ summary: 'Update an event' }),
    ApiResponse({ status: 200, description: 'Event updated' }),
    ApiBody({ type: UpdateEventDto }),
  );
}
