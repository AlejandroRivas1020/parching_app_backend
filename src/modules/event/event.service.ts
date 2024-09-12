import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  create(createEventDto: CreateEventDto, userId: string) {
    const {
      startDate,
      endDate,
      capacity,
      location,
      information,
      categories,
      isAdmin,
      host,
      images,
    } = createEventDto;

    if (isAdmin && host) {
      console.log('uwu');
    } else {
      console.log('yes');
    }
    return 'This action adds a new event';
  }

  findAll() {
    return `This action returns all event`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
