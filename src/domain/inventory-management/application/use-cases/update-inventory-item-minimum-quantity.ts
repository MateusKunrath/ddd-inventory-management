import { Either, left, right } from '@/core/either'
import { InventoryItem } from '../../enterprise/entities/inventory-item'
import { InventoryItemsRepository } from '../repositories/inventory-items-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface UpdateInventoryItemMinimumQuantityUseCaseRequest {
  inventoryItemId: string
  minimumQuantity: number
}

type UpdateInventoryItemMinimumQuantityUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    inventoryItem: InventoryItem
  }
>

export class UpdateInventoryItemMinimumQuantityUseCase {
  constructor(private inventoryItemsRepository: InventoryItemsRepository) {}

  async execute({
    inventoryItemId,
    minimumQuantity,
  }: UpdateInventoryItemMinimumQuantityUseCaseRequest): Promise<UpdateInventoryItemMinimumQuantityUseCaseResponse> {
    const inventoryItem =
      await this.inventoryItemsRepository.findById(inventoryItemId)

    if (!inventoryItem) {
      return left(new ResourceNotFoundError('InventoryItem'))
    }

    inventoryItem.minimumQuantity = minimumQuantity

    await this.inventoryItemsRepository.save(inventoryItem)

    return right({ inventoryItem })
  }
}
