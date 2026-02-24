import { InMemoryProductsRepository } from 'test/repositories/in-memory-products-repository'
import { makeProduct } from 'test/factories/make-product'
import { Sku } from '../../enterprise/entities/value-objects/sku'
import { GetProductBySkuUseCase } from './get-product-by-sku'

let inMemoryProductsRepository: InMemoryProductsRepository
let sut: GetProductBySkuUseCase

describe('Get product by sku use case', () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    sut = new GetProductBySkuUseCase(inMemoryProductsRepository)
  })

  it('should be able to get a product by sku', async () => {
    const newProduct = makeProduct({ sku: Sku.create('SKU-123') })

    await inMemoryProductsRepository.create(newProduct)

    const result = await sut.execute({
      sku: 'SKU-123',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.product.description).toEqual(newProduct.description)
    }
  })
})
