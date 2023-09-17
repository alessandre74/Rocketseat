import {
  CreateCategory,
  ICategoriesRepository
} from '@/modules/cars/repositories/ICategoriesRepository'

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, description }: CreateCategory): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new Error('Category Already exists!')
    }

    this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase }
