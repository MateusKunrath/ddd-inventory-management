import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface InventoryItemProps {
  productId: UniqueEntityId
  currentQuantity: number
  minimumQuantity: number
  createdAt: Date
  updatedAt?: Date
}

export class InventoryItem extends Entity<InventoryItemProps> {
  get productId() {
    return this.props.productId
  }

  get currentQuantity() {
    return this.props.currentQuantity
  }

  set currentQuantity(currentQuantity: number) {
    this.props.currentQuantity = currentQuantity
    this.touch()
  }

  get minimumQuantity() {
    return this.props.minimumQuantity
  }

  set minimumQuantity(minimumQuantity: number) {
    this.props.minimumQuantity = minimumQuantity
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<InventoryItemProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    return new InventoryItem(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
