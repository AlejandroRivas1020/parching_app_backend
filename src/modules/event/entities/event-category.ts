import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { AuditableEntity } from 'src/common/entities/auditable.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('events_categories')
export class EventCategory extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'events_id', type: 'uuid' })
  eventId: string;

  @ManyToOne(() => Event)
  @JoinColumn({ name: 'events_id' })
  event: Event;

  @Column({ name: 'categories_id', type: 'uuid' })
  categoryId: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categories_id' })
  category: Category;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  updatedBy: User;
}
