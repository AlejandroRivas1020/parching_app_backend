import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from 'src/common/entities/auditable.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Event } from './event.entity';

@Entity('events-images')
export class EventImage extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  image: string;

  @ManyToOne(() => Event, (event) => event.images)
  @JoinColumn({ name: 'events_id' })
  event: Event;

  @Column({ name: 'events_id' })
  eventId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  updatedBy: User;
}
