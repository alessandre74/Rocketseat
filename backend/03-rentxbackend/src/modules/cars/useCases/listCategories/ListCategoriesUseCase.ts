import { ICategoriesRepository } from '@/modules/cars/repositories/ICategoriesRepository'
import { Category } from '@/modules/cars/entities/Category'

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list()
    return categories
  }
}

export { ListCategoriesUseCase }
