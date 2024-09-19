import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique ID of the notification',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'Title of the notification',
    example: 'Event Update',
  })
  title: string;

  @Column()
  @ApiProperty({
    description: 'Notification message',
    example: 'The event has changed date.',
  })
  message: string;

  @Column({ default: false })
  @ApiProperty({
    description: 'If the notification has been read',
    example: false,
  })
  isRead: boolean;

  @ManyToOne(() => User, (user) => user.notifications, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
