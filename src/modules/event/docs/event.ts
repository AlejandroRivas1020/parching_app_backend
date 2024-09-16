import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateEventDto } from '../dto/create-event.dto';

export function CreateEvent() {
  return applyDecorators(
    ApiOperation({ summary: 'Create an event' }),
    ApiResponse({ status: 200, description: 'Event created' }),
    ApiBody({ type: CreateEventDto }),
  );
}
