import { SpecificationsRepository } from '@/modules/cars/repositories/implementations/SpecificationsRepository'
import { ListSpecificationsController } from '@/modules/cars/useCases/listSpecifications/ListSpecificationsController'
import { ListSpecificationsUseCase } from '@/modules/cars/useCases/listSpecifications/ListSpecificationsUseCase'

const specificationsRepository = SpecificationsRepository.getInstance()
const listSpecificationsUseCase = new ListSpecificationsUseCase(specificationsRepository)
const listSpecificationsController = new ListSpecificationsController(listSpecificationsUseCase)

export { listSpecificationsController }
