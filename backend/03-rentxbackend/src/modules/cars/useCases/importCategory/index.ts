import { CategoriesRepository } from '@/modules/cars/repositories/implementations/CategoriesRepository'
import { ImportCategoryController } from './ImportCategoryController'
import { ImportCategoryUseCase } from './ImportCategoryUseCase'

const categoriesRepository = null
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository)
const importCategoryController = new ImportCategoryController(importCategoryUseCase)

export { importCategoryController }
