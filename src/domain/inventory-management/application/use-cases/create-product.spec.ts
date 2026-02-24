import { InMemoryProductsRepository } from 'test/repositories/in-memory-products-repository'
import { CreateProductUseCase } from './create-product'

let inMemoryProductsRepository: InMemoryProductsRepository
let sut: CreateProductUseCase

describe('Create product use case', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new CreateProductUseCase(inMemoryProductsRepository)
  })

  it('should be able to create a new product', async () => {
    const result = await sut.execute({
      description: 'Camiseta',
      size: 'M',
      color: 'Preta',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProductsRepository.items).toHaveLength(1)
    expect(inMemoryProductsRepository.items[0]).toEqual(result.value?.product)
  })
})
