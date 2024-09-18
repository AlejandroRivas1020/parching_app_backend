import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class CategorySeeder {
  private readonly logger = new Logger(CategorySeeder.name);

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async seed() {
    const categories = [
      { name: 'Naturaleza y Aire Libre' },
      { name: 'Arte y Cultura' },
      { name: 'Social y Comunitario' },
      { name: 'Deportes y Bienestar' },
      { name: 'Educación y Aprendizaje' },
      { name: 'Gastronomía' },
      { name: 'Tecnología e Innovación' },
      { name: 'Medio Ambiente y Sostenibilidad' },
    ];

    for (const category of categories) {
      const normalizedCategoryName = category.name.toLowerCase().trim();
      const exists = await this.categoryRepository.findOne({
        where: { name: normalizedCategoryName },
      });

      if (!exists) {
        const newCategory = this.categoryRepository.create({
          ...category,
          name: normalizedCategoryName,
        });

        await this.categoryRepository.save(newCategory);
        this.logger.log(`Category '${category.name}' has been added.`);
      } else {
        this.logger.log(`Category '${category.name}' already exists.`);
      }
    }
  }
}
