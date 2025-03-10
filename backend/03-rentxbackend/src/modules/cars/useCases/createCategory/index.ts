import { CategoriesRepository } from '@/modules/cars/repositories/implementations/CategoriesRepository'
import { CreateCategoryController } from '@/modules/cars/useCases/createCategory/CreateCategoryController'
import { CreateCategoryUseCase } from '@/modules/cars/useCases/createCategory/CreateCategoryUseCase'

export default (): CreateCategoryController => {
  const categoriesRepository = new CategoriesRepository()
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
  const createCategoryController = new CreateCategoryController(createCategoryUseCase)

  return createCategoryController
}
