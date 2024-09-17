import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, type Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User } from '../user/entities/user.entity';
import { Event } from './entities/event.entity';
import { Category } from '../category/entities';
import { EventImage } from './entities/event-image';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(EventImage)
    private readonly eventImageRepository: Repository<EventImage>,
  ) {}

  async create(createEventDto: CreateEventDto, userId: string) {
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

    const createdBy = await this.userRepository.findOneBy({ id: userId });

    if (!createdBy) throw new BadRequestException('User admin not found');

    let eventHost: User;

    if (isAdmin && host) {
      eventHost = await this.userRepository.findOneBy({ id: host });
      if (!eventHost) throw new BadRequestException('User client not found');
    } else {
      eventHost = createdBy;
    }

    const eventCategories = await this.categoryRepository.findBy({
      id: In(categories),
    });

    return await this.createEvent(
      createdBy,
      eventHost,
      startDate,
      endDate,
      capacity,
      location,
      information,
      eventCategories,
      images,
    );
  }

  private async createEvent(
    createdBy: User,
    host: User,
    startDate: Date,
    endDate: Date,
    capacity: number,
    location: string,
    information: Record<string, any>,
    categories: Category[],
    images: string[],
  ) {
    console.log({ startDate, endDate });

    const event = this.eventRepository.create({
      startDate,
      endDate,
      capacity,
      location,
      information,
      host,
      createdBy,
      eventsCategories: categories,
      updatedBy: createdBy,
    });

    event.images = images.map((i) =>
      this.eventImageRepository.create({
        image: i,
        event,
        createdBy,
        updatedBy: createdBy,
      }),
    );

    return await this.eventRepository.save(event);
  }

  findAll() {
    return `This action returns all event`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    console.log(updateEventDto);

    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
