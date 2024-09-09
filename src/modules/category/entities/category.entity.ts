import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../common/entities/auditable.entity';
import { EventCategory } from 'src/modules/event/entities/event-category';
import { FormTemplate } from 'src/modules/form-template/entities/form-template.entity';

@Entity('categories')
export class Category extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => EventCategory, (eventCategory) => eventCategory.category)
  eventsCategories: EventCategory[];

  @OneToMany(() => FormTemplate, (formTemplate) => formTemplate.category, {
    eager: true,
  })
  formTemplate: FormTemplate;
}
