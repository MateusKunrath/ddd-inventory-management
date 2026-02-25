import { InMemoryInventoryItemsRepository } from 'test/repositories/in-memory-inventory-items-repository'
import { makeInventoryItem } from 'test/factories/make-inventory-item'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { UpdateInventoryItemMinimumQuantityUseCase } from './update-inventory-item-minimum-quantity'

let inMemoryInventoryItemsRepository: InMemoryInventoryItemsRepository
let sut: UpdateInventoryItemMinimumQuantityUseCase

describe('Update inventory item minimum quantity use case', () => {
  beforeEach(() => {
    inMemoryInventoryItemsRepository = new InMemoryInventoryItemsRepository()
    sut = new UpdateInventoryItemMinimumQuantityUseCase(
      inMemoryInventoryItemsRepository,
    )
  })

  it('should be able to update a inventory item minimum quantity', async () => {
    const newInventoryItem = makeInventoryItem(
      { minimumQuantity: 24 },
      new UniqueEntityId('inventory-item-1'),
    )

    await inMemoryInventoryItemsRepository.create(newInventoryItem)

    await sut.execute({
      inventoryItemId: 'inventory-item-1',
      minimumQuantity: 5,
    })

    expect(inMemoryInventoryItemsRepository.items).toHaveLength(1)
    expect(inMemoryInventoryItemsRepository.items[0]).toMatchObject({
      minimumQuantity: 5,
    })
  })
})
