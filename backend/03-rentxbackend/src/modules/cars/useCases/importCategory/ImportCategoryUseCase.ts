import fs from 'fs'
import csvParse from 'csv-parse'
import {
  CreateCategory,
  ICategoriesRepository
} from '@/modules/cars/repositories/ICategoriesRepository'

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<CreateCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      const categories: CreateCategory[] = []

      const parseFile = csvParse()

      stream.pipe(parseFile)

      parseFile
        .on('data', async line => {
          const [name, description] = line

          categories.push({ name, description })
        })
        .on('end', () => {
          fs.promises.unlink(file.path)
          resolve(categories)
        })
        .on('error', err => reject(err))
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)

    categories.map(category => {
      const { name, description } = category

      const existCategory = this.categoriesRepository.findByName(name)

      if (!existCategory) {
        this.categoriesRepository.create({ name, description })
      }
    })
  }
}

export { ImportCategoryUseCase }
