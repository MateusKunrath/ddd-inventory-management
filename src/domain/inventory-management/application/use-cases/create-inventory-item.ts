import { Either, right } from '@/core/either'
import { InventoryItem } from '../../enterprise/entities/inventory-item'
import { InventoryItemsRepository } from '../repositories/inventory-items-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface CreateInventoryItemUseCaseRequest {
  productId: string
  currentQuantity: number
  minimumQuantity: number
}

type CreateInventoryItemUseCaseResponse = Either<
  null,
  {
    inventoryitem: InventoryItem
  }
>

export class CreateInventoryItemUseCase {
  constructor(private inventoryitemsRepository: InventoryItemsRepository) {}

  async execute({
    productId,
    currentQuantity,
    minimumQuantity,
  }: CreateInventoryItemUseCaseRequest): Promise<CreateInventoryItemUseCaseResponse> {
    const inventoryitem = InventoryItem.create({
      productId: new UniqueEntityId(productId),
      currentQuantity,
      minimumQuantity,
    })

    await this.inventoryitemsRepository.create(inventoryitem)

    return right({ inventoryitem })
  }
}
