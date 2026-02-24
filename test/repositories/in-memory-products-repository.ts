import { ProductsRepository } from '@/domain/inventory-management/application/repositories/products-repository'
import { Product } from '@/domain/inventory-management/enterprise/entities/product'

export class InMemoryProductsRepository implements ProductsRepository {
  items: Product[] = []

  async create(product: Product) {
    this.items.push(product)
  }
}
