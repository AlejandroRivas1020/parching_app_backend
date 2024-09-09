import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
  OneToOne,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Client } from 'src/modules/client/entities/client.entity';
import { AuditableEntity } from 'src/common/entities/auditable.entity';

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

  @Column({ type: 'uuid', name: 'roles_id' })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'roles_id' })
  role: Role;

  @Column({ nullable: true, name: 'clients_id' })
  clientId?: number;

  @OneToOne(() => Client, (client) => client.user, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'clients_id' })
  client?: Client;
}
