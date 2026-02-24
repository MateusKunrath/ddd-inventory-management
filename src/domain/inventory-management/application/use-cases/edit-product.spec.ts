import { InMemoryProductsRepository } from 'test/repositories/in-memory-products-repository'
import { CreateProductUseCase } from './create-product'
import { makeProduct } from 'test/factories/make-product'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryProductsRepository: InMemoryProductsRepository
let sut: CreateProductUseCase

describe('Edit product use case', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new CreateProductUseCase(inMemoryProductsRepository)
  })

  it('should be able to create a new product', async () => {
    const newProduct = makeProduct({}, new UniqueEntityId('product-1'))

    await inMemoryProductsRepository.create(newProduct)

    await sut.execute({
      description: 'Camiseta',
      size: 'M',
      color: 'Preta',
    })

    expect(inMemoryProductsRepository.items).toHaveLength(1)
    expect(inMemoryProductsRepository.items[0]).toMatchObject({
      description: 'Camiseta',
      size: 'M',
      color: 'Preta',
    })
  })
})
