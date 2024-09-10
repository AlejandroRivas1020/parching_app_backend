import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gender } from '../enums/gender.enum';
import { User } from 'src/modules/user/entities/user.entity';
import { AuditableEntity } from 'src/common/entities/auditable.entity';

@Entity('clients')
export class Client extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date', name: 'birth_date' })
  birthDate: Date;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'varchar', length: 100 })
  address: string;

  @Column({ type: 'text', name: 'location_description' })
  locationDescription: string;

  @Column({ type: 'float' })
  score: number;

  @Column({ type: 'int', name: 'users_id' })
  userId: string;

  @OneToOne(() => User, (user) => user.client)
  @JoinColumn({ name: 'users_id' })
  user: User;
}
