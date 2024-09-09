import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from 'src/common/entities/auditable.entity';
import { Permission } from './permission.entity';

@Entity('paths')
export class Path extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  pathname: string;

  @OneToMany(() => Permission, (permission) => permission.path)
  permissions: Permission[];
}
