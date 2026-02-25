import { InventoryItemsRepository } from '@/domain/inventory-management/application/repositories/inventory-items-repository'
import { InventoryItem } from '@/domain/inventory-management/enterprise/entities/inventory-item'

export class InMemoryInventoryItemsRepository implements InventoryItemsRepository {
  items: InventoryItem[] = []

  async findById(id: string): Promise<InventoryItem | null> {
    const inventoryitem = this.items.find((item) => item.id.toString() === id)
    return inventoryitem ?? null
  }

  async save(inventoryItem: InventoryItem) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === inventoryItem.id,
    )
    this.items[itemIndex] = inventoryItem
  }

  async create(inventoryItem: InventoryItem) {
    this.items.push(inventoryItem)
  }
}
