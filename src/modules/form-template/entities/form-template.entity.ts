import { AuditableEntity } from 'src/common/entities/auditable.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('forms_templates')
export class FormTemplate extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'categories_id', type: 'uuid' })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.formTemplate)
  @JoinColumn({ name: 'categories_id' })
  category: Category;

  @Column({ type: 'json' })
  form: any;
}
