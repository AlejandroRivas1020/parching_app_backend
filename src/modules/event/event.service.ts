import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, DataSource, QueryRunner } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User } from '../user/entities/user.entity';
import { Event } from './entities/event.entity';
import { Category } from '../category/entities';
import { EventImage } from './entities/event-image.entity';
import { EventCategory } from './entities/event-category.entity';
import { Transactional } from 'src/common/decorators/transactional.decorator';
import type { GetEventsQueryDto } from './dto/get-events-query.dto';
import type { EventState } from './enums/event-state.enum';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createEventDto: CreateEventDto, userId?: string) {
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

    const createdBy = await this.userRepository.findOneBy({
      name: 'Admin User',
    });

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

  async findAll(query: GetEventsQueryDto, userId: string) {
    const { categoryId, userType, eventsState } = query;

    let baseQuery = this.eventRepository
      .createQueryBuilder('event')
      .where('event.state = :state', { state: eventsState })
      .innerJoin('event.eventCategories', 'eventCategory')
      .innerJoinAndSelect('eventCategory.category', 'category');

    if (categoryId) {
      baseQuery = baseQuery.andWhere('category.id = :categoryId', {
        categoryId,
      });
    }

    if (userType) {
      const user = await this.userRepository.findOneBy({ name: 'Admin User' });

      baseQuery =
        userType == 'host'
          ? baseQuery
              .innerJoin('event.host', 'host')
              .andWhere('host.id = :userId', { userId: user.id })
          : baseQuery
              .innerJoin('event.guests', 'guest')
              .andWhere('guest.id = :userId', { userId: user.id });
    }
    return await baseQuery.getMany();
  }

  async getJoined(userId: string, state: EventState) {
    return await this.eventRepository.findBy({
      state,
      guests: { id: userId },
    });
  }

  async findOne(id: string) {
    return await this.eventRepository.findOneBy({ id });
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    console.log(updateEventDto);

    return `This action updates a ${id} event`;
  }

  async subscribeTo(eventId: string, userId: string) {}

  async unsubscribeFrom(eventId: string, userId: string) {}

  @Transactional()
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
    queryRunner?: QueryRunner,
  ) {
    const event = queryRunner.manager.create(Event, {
      startDate,
      endDate,
      capacity,
      location,
      information,
      host,
      createdBy,
      updatedBy: createdBy,
    });

    await queryRunner.manager.save(event);

    const eventCategories = categories.map((c) =>
      queryRunner.manager.create(EventCategory, {
        category: c,
        event: event,
        createdBy,
        updatedBy: createdBy,
      }),
    );

    await queryRunner.manager.save(eventCategories);

    const eventImages = images.map((i) =>
      queryRunner.manager.create(EventImage, {
        image: i,
        event,
        createdBy,
        updatedBy: createdBy,
      }),
    );

    await queryRunner.manager.save(eventImages);

    return 'Event created successfully';
  }
}
