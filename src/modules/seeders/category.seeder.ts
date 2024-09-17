import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
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

    // Obtener los nombres de las categorías existentes
    const existingCategories = await this.categoryRepository.find({
      where: { name: In(categories.map((category) => category.name)) },
    });

    // Crear un conjunto de nombres existentes para comparación rápida
    const existingCategoryNames = new Set(
      existingCategories.map((category) => category.name),
    );

    // Filtrar las categorías que no existen
    const newCategories = categories.filter(
      (category) => !existingCategoryNames.has(category.name),
    );

    // Crear y guardar las nuevas categorías en una sola operación
    if (newCategories.length > 0) {
      const createdCategories = this.categoryRepository.create(newCategories);
      await this.categoryRepository.save(createdCategories);
    }
  }
}
