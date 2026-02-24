import { ProductsRepository } from '@/domain/inventory-management/application/repositories/products-repository'
import { Product } from '@/domain/inventory-management/enterprise/entities/product'

export class InMemoryProductsRepository implements ProductsRepository {
  items: Product[] = []

  async findById(id: string): Promise<Product | null> {
    const product = this.items.find((item) => item.id.toString() === id)
    return product ?? null
  }

  async findBySku(sku: string): Promise<Product | null> {
    const product = this.items.find((item) => item.sku.value === sku)
    return product ?? null
  }

  async save(product: Product): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === product.id)
    this.items[itemIndex] = product
  }

  async create(product: Product) {
    this.items.push(product)
  }
}
