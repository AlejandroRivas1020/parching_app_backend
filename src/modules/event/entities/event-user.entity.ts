import { AuditableEntity } from 'src/common/entities/auditable.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';
import { Event } from './event.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('events-users')
export class EventUser extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'event_id', type: 'uuid' })
  eventId: string;

  @ManyToOne(() => Event, (event) => event.guests)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.eventsUser)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
