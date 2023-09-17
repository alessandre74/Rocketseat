import {
  CreateSpecification,
  ISpecificationsRepository
} from '@/modules/cars/repositories/ISpecificationsRepository'

class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  async execute({ name, description }: CreateSpecification): Promise<void> {
    const speficicationAlreadyExists = await this.specificationRepository.findByName(name)

    if (speficicationAlreadyExists) {
      throw new Error('Specification Already exists!')
    }

    this.specificationRepository.create({ name, description })
  }
}

export { CreateSpecificationUseCase }
