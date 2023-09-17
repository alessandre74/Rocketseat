import { SpecificationsRepository } from '@/modules/cars/repositories/implementations/SpecificationsRepository'
import { CreateSpecificationController } from '@/modules/cars/useCases/createSpecification/CreateSpecificationController'
import { CreateSpecificationUseCase } from '@/modules/cars/useCases/createSpecification/CreateSpecificationUseCase'

export default (): CreateSpecificationController => {
  const specificationsRepository = new SpecificationsRepository()
  const createSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepository)
  const createSpecificationController = new CreateSpecificationController(
    createSpecificationUseCase
  )

  return createSpecificationController
}
