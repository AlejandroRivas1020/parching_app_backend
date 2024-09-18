import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, DataSource, type QueryRunner } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User } from '../user/entities/user.entity';
import { Event } from './entities/event.entity';
import { Category } from '../category/entities';
import { EventImage } from './entities/event-image.entity';
import { EventCategory } from './entities/event-category.entity';
import { Transactional } from 'src/common/decorators/transactional.decorator';
import { EventUser } from './entities/event-user.entity';

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
    @InjectRepository(EventCategory)
    private readonly eventCategoryRepository: Repository<EventCategory>,
    @InjectRepository(EventUser)
    private readonly eventUser: Repository<EventUser>,
    private readonly dataSource: DataSource,
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
      this.eventImageRepository.create({
        image: i,
        event,
        createdBy,
        updatedBy: createdBy,
      }),
    );

    await queryRunner.manager.save(eventImages);

    return 'Event created successfully';
  }

  async findAll() {
    return await this.eventRepository.find();
  }

  async findOne(id: string) {
    return await this.eventRepository.findOneBy({ id });
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    console.log(updateEventDto);

    return `This action updates a ${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
