import { InventoryItem } from '../../enterprise/entities/inventory-item'

export interface InventoryItemsRepository {
  findById(id: string): Promise<InventoryItem | null>
  save(inventoryItem: InventoryItem): Promise<void>
  create(inventoryItem: InventoryItem): Promise<void>
}
