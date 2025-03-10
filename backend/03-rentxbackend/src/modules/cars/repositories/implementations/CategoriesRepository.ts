import { getRepository, Repository } from 'typeorm'
import { Category } from '@/modules/cars/entities/Category'
import {
  CreateCategory,
  ICategoriesRepository
} from '@/modules/cars/repositories/ICategoriesRepository'

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category)
  }

  async create({ name, description }: CreateCategory): Promise<void> {
    const category = this.repository.create({ name, description })

    await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find()
    return categories
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name })
    return category
  }
}

export { CategoriesRepository }
