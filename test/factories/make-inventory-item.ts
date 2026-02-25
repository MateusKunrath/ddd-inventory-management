import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  InventoryItem,
  InventoryItemProps,
} from '@/domain/inventory-management/enterprise/entities/inventory-item'

export function makeInventoryItem(
  override: Partial<InventoryItemProps> = {},
  id?: UniqueEntityId,
) {
  return InventoryItem.create(
    {
      productId: new UniqueEntityId(),
      currentQuantity: faker.number.int({ min: 0, max: 100 }),
      minimumQuantity: faker.number.int({ min: 0, max: 100 }),
      ...override,
    },
    id,
  )
}
