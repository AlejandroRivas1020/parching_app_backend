import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, QueryRunner, DataSource } from 'typeorm';
import { CreateEventDto, UpdateEventDto, GetEventsQueryDto } from './dto';
import { Event, EventUser, EventImage, EventCategory } from './entities';
import { User } from '../user/entities/user.entity';
import { Category } from '../category/entities';
import { Transactional } from 'src/common/decorators/transactional.decorator';
import { EventState } from './enums/event-state.enum';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(EventUser)
    private readonly eventUserRepository: Repository<EventUser>,
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

  async findAll(query: GetEventsQueryDto) {
    const { categoryId, userType, eventsState, userId } = query;

    let baseQuery = this.eventRepository
      .createQueryBuilder('event')
      .innerJoin('event.eventCategories', 'eventCategory')
      .innerJoinAndSelect('event.images', 'images')
      .innerJoinAndSelect('eventCategory.category', 'category');

    if (categoryId) {
      baseQuery = baseQuery.andWhere('category.id = :categoryId', {
        categoryId,
      });
    }

    if (eventsState) {
      baseQuery = baseQuery.andWhere('event.state = :state', {
        state: eventsState,
      });
    }

    if (userType) {
      baseQuery =
        userType == 'host'
          ? baseQuery
              .innerJoin('event.host', 'host')
              .andWhere('host.id = :userId', { userId })
          : baseQuery
              .innerJoin('event.guests', 'guest')
              .innerJoin('guest.user', 'user')
              .andWhere('user.id = :userId', { userId });
    }
    return await baseQuery.getMany();
  }

  async findOne(id: string) {
    return await this.eventRepository.findOne({
      where: { id },
      relations: ['guests', 'images', 'eventCategories'],
    });
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const event = await this.eventRepository.findOneBy({ id });

    if (!event) throw new NotFoundException('Event not found');

    await this.eventRepository.update({ id }, updateEventDto);

    return `Event updated successfully`;
  }

  async subscribeTo(eventId: string, userId: string) {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['guests'],
    });

    const user = await this.userRepository.findOneBy({ id: userId });

    if (event.guests) {
      if (
        event.guests.some((g) => g.userId === userId) ||
        event.hostId === userId
      ) {
        throw new BadRequestException('User already in the event');
      }

      if (event.capacity === 0) {
        throw new BadRequestException('Event is at full capacity');
      }

      if (
        event.state == EventState.CANCELLED ||
        event.state == EventState.CLOSED
      )
        throw new BadRequestException('Event is closed or cancelled');
    }

    const eventUser = this.eventUserRepository.create({
      user,
      event,
      createdBy: user,
      updatedBy: user,
    });

    await this.eventUserRepository.save(eventUser);

    event.capacity -= 1;
    event.guests.push(eventUser);
    await this.eventRepository.save(event);

    return 'User subscribed to event successfully';
  }

  async unsubscribeFrom(eventId: string, userId: string) {
    const event = await this.eventRepository.findOneBy({ id: eventId });
    const eventUser = await this.eventUserRepository.findOneBy({
      event: { id: eventId },
      user: { id: userId },
    });

    if (eventUser) {
      // event.guests.pop(eventUser);
      await this.eventUserRepository.remove(eventUser);
      event.capacity += 1;
      await this.eventRepository.save(event);
      return 'User removed from event successfully';
    } else {
      throw new NotFoundException('Guest not found in the event');
    }
  }

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

  private validateHost(userId: string, event: Event) {
    if (event.hostId === userId) {
      return true;
    }
    return false;
  }
}
