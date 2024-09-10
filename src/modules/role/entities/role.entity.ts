import { Permission } from 'src/modules/permission/entities/permission.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { AuditableEntity } from '../../../common/entities/auditable.entity';

@Entity('roles')
export class Role extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => Permission, (permission) => permission.path)
  permissions: Permission[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
