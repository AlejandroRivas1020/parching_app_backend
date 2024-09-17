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
    description: 'ID único de la notificación',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'Título de la notificación',
    example: 'Actualización de evento',
  })
  title: string;

  @Column()
  @ApiProperty({
    description: 'Mensaje de la notificación',
    example: 'El evento ha cambiado de fecha.',
  })
  message: string;

  @Column({ default: false })
  @ApiProperty({
    description: 'Si la notificación ha sido leída',
    example: false,
  })
  isRead: boolean;

  @ManyToOne(() => User, (user) => user.notifications, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
