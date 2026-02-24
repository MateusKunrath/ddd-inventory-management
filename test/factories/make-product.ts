import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Product,
  ProductProps,
} from '@/domain/inventory-management/enterprise/entities/product'

export function makeProduct(
  override: Partial<ProductProps> = {},
  id?: UniqueEntityId,
) {
  return Product.create(
    {
      description: faker.lorem.word(),
      size: faker.helpers.arrayElement(['P', 'M', 'G']),
      color: faker.color.human(),
      ...override,
    },
    id,
  )
}
