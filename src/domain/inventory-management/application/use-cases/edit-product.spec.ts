import { InMemoryProductsRepository } from 'test/repositories/in-memory-products-repository'
import { makeProduct } from 'test/factories/make-product'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditProductUseCase } from './edit-product'

let inMemoryProductsRepository: InMemoryProductsRepository
let sut: EditProductUseCase

describe('Edit product use case', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new EditProductUseCase(inMemoryProductsRepository)
  })

  it('should be able to create a new product', async () => {
    const newProduct = makeProduct({}, new UniqueEntityId('product-1'))

    await inMemoryProductsRepository.create(newProduct)

    await sut.execute({
      productId: 'product-1',
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
