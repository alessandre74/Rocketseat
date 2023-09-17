import { Category } from '@/modules/cars/entities/Category'

type CreateCategory = {
  name: string
  description: string
}

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>
  list(): Promise<Category[]>
  create({ name, description }: CreateCategory): Promise<void>
}

export { ICategoriesRepository, CreateCategory }
