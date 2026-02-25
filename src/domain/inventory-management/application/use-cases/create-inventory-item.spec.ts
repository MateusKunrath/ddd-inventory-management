import { InMemoryInventoryItemsRepository } from 'test/repositories/in-memory-inventory-items-repository'
import { CreateInventoryItemUseCase } from './create-inventory-item'
import { makeProduct } from 'test/factories/make-product'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryInventoryItemsRepository: InMemoryInventoryItemsRepository
let sut: CreateInventoryItemUseCase

describe('Create inventoryitem use case', () => {
  beforeEach(() => {
    inMemoryInventoryItemsRepository = new InMemoryInventoryItemsRepository()
    sut = new CreateInventoryItemUseCase(inMemoryInventoryItemsRepository)
  })

  it('should be able to create a new inventoryitem', async () => {
    const product = makeProduct({}, new UniqueEntityId('product-1'))

    const result = await sut.execute({
      productId: product.id.toString(),
      currentQuantity: 10,
      minimumQuantity: 5,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryInventoryItemsRepository.items).toHaveLength(1)
    expect(inMemoryInventoryItemsRepository.items[0]).toEqual(
      result.value?.inventoryitem,
    )
  })
})
