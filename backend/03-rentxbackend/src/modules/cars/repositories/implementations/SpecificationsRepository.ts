import { getRepository, Repository } from 'typeorm'
import { Specification } from '@/modules/cars/entities/Specification'
import {
  CreateSpecification,
  ISpecificationsRepository
} from '@/modules/cars/repositories/ISpecificationsRepository'

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async create({ name, description }: CreateSpecification): Promise<void> {
    const specification = this.repository.create({ name, description })

    await this.repository.save(specification)
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find()
    return specifications
  }

  findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({ name })
    return specification
  }
}

export { SpecificationsRepository }
