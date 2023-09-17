import { CategoriesRepository } from '@/modules/cars/repositories/implementations/CategoriesRepository'
import { ListCategoriesController } from '@/modules/cars/useCases/listCategories/ListCategoriesController'
import { ListCategoriesUseCase } from '@/modules/cars/useCases/listCategories/ListCategoriesUseCase'

const categoriesRepository = null
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)
const listCategoriesController = new ListCategoriesController(listCategoriesUseCase)

export { listCategoriesController }
