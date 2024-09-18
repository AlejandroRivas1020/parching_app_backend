import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../../../common/entities/auditable.entity';
import { FormTemplate } from './form-template.entity';
import { EventCategory } from 'src/modules/event/entities/event-category.entity';

@Entity('categories')
export class Category extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @OneToMany(() => EventCategory, (eventCategory) => eventCategory.category, {
    eager: true,
  })
  eventsCategories: EventCategory[];

  @OneToMany(() => FormTemplate, (formTemplate) => formTemplate.category, {
    eager: true,
  })
  formTemplates: FormTemplate[];

  @BeforeInsert()
  @BeforeUpdate()
  before() {
    this.name = this.name.toLocaleLowerCase().trim();
  }
}
