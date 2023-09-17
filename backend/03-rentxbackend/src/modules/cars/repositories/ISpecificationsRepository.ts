import { Specification } from '@/modules/cars/entities/Specification'

type CreateSpecification = {
  name: string
  description: string
}

interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>
  list(): Promise<Specification[]>
  create({ name, description }: CreateSpecification): Promise<void>
}

export { ISpecificationsRepository, CreateSpecification }
