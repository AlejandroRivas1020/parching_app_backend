import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Path } from './path.entity';
import { Role } from '../../role/entities/role.entity';
import { AuditableEntity } from 'src/common/entities/auditable.entity';

@Entity('permissions')
export class Permission extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', name: 'can_create' })
  canCreate: boolean;

  @Column({ type: 'boolean', name: 'can_update' })
  canUpdate: boolean;

  @Column({ type: 'boolean', name: 'can_delete' })
  canDelete: boolean;

  @Column({ type: 'boolean', name: 'can_read' })
  canRead: boolean;

  @Column({ type: 'uuid', name: 'paths_id' })
  pathId: string;

  @ManyToOne(() => Path, (path) => path.permissions, { eager: true })
  @JoinColumn({ name: 'paths_id' })
  path: Path;

  @Column({ type: 'uuid', name: 'roles_id' })
  roleId: string;

  @ManyToOne(() => Role, (role) => role.permissions, { eager: true })
  @JoinColumn({ name: 'roles_id' })
  role: Role;
}
