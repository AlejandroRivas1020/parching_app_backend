import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from 'src/common/entities/auditable.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { EventCategory } from './event-category.entity';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { EventImage } from './event-image.entity';
import { EventUser } from './event-user.entity';

@Entity('events')
export class Event extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp with time zone', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'timestamp with time zone', name: 'end_date' })
  endDate: Date;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'varchar', length: 100 })
  location: string;

  @Column({ type: 'json' })
  information: Record<string, any>;

  @Column({ type: 'float', default: 0 })
  score: number;

  @Column({ name: 'host_id', type: 'uuid' })
  hostId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'host_id' })
  host: User;

  @OneToMany(() => EventCategory, (eventCategory) => eventCategory.event, {
    cascade: true,
  })
  eventCategories: EventCategory[];

  @OneToMany(() => EventImage, (image) => image.event, { eager: true })
  images: EventImage[];

  @OneToMany(() => Comment, (comment) => comment.event, {
    nullable: true,
    cascade: true,
  })
  comments: Comment[];

  @OneToMany(() => EventUser, (eventUser) => eventUser.event, {
    nullable: true,
  })
  guests: EventUser[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User;
}
