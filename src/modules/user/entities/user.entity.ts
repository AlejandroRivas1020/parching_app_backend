import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Client } from 'src/modules/client/entities/client.entity';
import { AuditableEntity } from 'src/common/entities/auditable.entity';
import { Notification } from 'src/modules/notifications/entities/notification.entity';

@Entity('users')
export class User extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  password: string;

  @Column({ type: 'text', name: 'profile_picture' })
  profilePicture: string;

  @Column({ type: 'uuid', name: 'role_id' })
  roleId: string;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ nullable: true, name: 'client_id' })
  clientId?: string;

  @OneToOne(() => Client, (client) => client.user, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'client_id' })
  client?: Client;

  // campos para notificaciones
  @Column({ default: true })
  emailNotifications: boolean;

  @Column({ default: true })
  platformNotifications: boolean;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}
