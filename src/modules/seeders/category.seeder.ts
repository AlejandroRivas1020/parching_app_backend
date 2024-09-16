import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity'; // Ajusta la ruta según tu estructura

@Injectable()
export class CategorySeeder {
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
      const exists = await this.categoryRepository.findOne({
        where: { name: category.name },
      });
      if (!exists) {
        const newCategory = this.categoryRepository.create(category);
        await this.categoryRepository.save(newCategory);
      }
    }
  }
}
