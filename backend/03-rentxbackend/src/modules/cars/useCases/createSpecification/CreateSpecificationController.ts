import { Request, Response } from 'express'
import { CreateSpecificationUseCase } from '@/modules/cars/useCases/createSpecification/CreateSpecificationUseCase'

class CreateSpecificationController {
  constructor(private createSpecificationUsecase: CreateSpecificationUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body

      await this.createSpecificationUsecase.execute({ name, description })

      return response.status(201).send()
    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
  }
}

export { CreateSpecificationController }
