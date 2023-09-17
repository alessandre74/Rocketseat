import { ISpecificationsRepository } from '@/modules/cars/repositories/ISpecificationsRepository'
import { Specification } from '@/modules/cars/entities/Specification'

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}
  execute(): Specification[] {
    const specifications = this.specificationsRepository.list()
    return specifications
  }
}

export { ListSpecificationsUseCase }
