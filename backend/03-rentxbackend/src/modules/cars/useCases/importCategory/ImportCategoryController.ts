import { Request, Response } from 'express'
import { ImportCategoryUseCase } from '@/modules/cars/useCases/importCategory/ImportCategoryUseCase'

class ImportCategoryController {
  constructor(private importCategoryUsecase: ImportCategoryUseCase) {}

  handle(resquest: Request, response: Response): Response {
    const { file } = resquest

    this.importCategoryUsecase.execute(file)

    return response.send()
  }
}

export { ImportCategoryController }
