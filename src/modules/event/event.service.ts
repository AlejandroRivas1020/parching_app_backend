import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { In, type Repository } from 'typeorm';
import { Category } from '../category/entities';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
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

    if (!createdBy) throw new BadRequestException('User not found');

    let eventHost: User;

    if (isAdmin && host) {
      eventHost = await this.userRepository.findOneBy({ id: host });
      if (!eventHost) throw new BadRequestException('User not found');
      console.log(eventHost);
    } else {
      eventHost = createdBy;
    }

    const eventCategories = await this.categoryRepository.findBy({
      id: In(categories),
    });
    await this.createEvent(
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

    return 'This action adds a new event';
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
    console.log({
      createdBy,
      host,
      startDate,
      endDate,
      capacity,
      information,
      categories,
      images,
      location,
    });
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
