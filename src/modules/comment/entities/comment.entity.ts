import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from 'src/common/entities/auditable.entity';
import { Event } from 'src/modules/event/entities/event.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('comments')
export class Comment extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'uuid', name: 'events_id' })
  eventId: string;

  @ManyToOne(() => Event, (event) => event.comments)
  event: Event;

  @ManyToOne(() => Comment, (parent) => parent.subComment)
  comment: Comment;

  @OneToMany(() => Comment, (comment) => comment.comment)
  subComment: Comment[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  updatedBy: User;
}
