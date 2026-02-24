import { Entity } from '@/core/entities/entity'
import { Sku } from './value-objects/sku'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { randomUUID } from 'node:crypto'

export interface ProductProps {
  sku: Sku
  description: string
  size: string
  color: string
  createdAt: Date
  updatedAt?: Date
}

export class Product extends Entity<ProductProps> {
  get sku() {
    return this.props.sku
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  get size() {
    return this.props.size
  }

  set size(size: string) {
    this.props.size = size
    this.touch()
  }

  get color() {
    return this.props.color
  }

  set color(color: string) {
    this.props.color = color
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.description.substring(0, 50).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<ProductProps, 'createdAt' | 'sku'>,
    id?: UniqueEntityId,
  ) {
    return new Product(
      {
        ...props,
        sku: props.sku ?? Sku.create(randomUUID()),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
