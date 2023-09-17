import {
  CreateSpecification,
  ISpecificationsRepository
} from '@/modules/cars/repositories/ISpecificationsRepository'

class CreateSpecificationService {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  execute({ name, description }: CreateSpecification): void {
    const speficicationAlreadyExists = this.specificationRepository.findByName(name)

    if (speficicationAlreadyExists) {
      throw new Error('Specification Already exists!')
    }

    this.specificationRepository.create({ name, description })
  }
}

export { CreateSpecificationService }
