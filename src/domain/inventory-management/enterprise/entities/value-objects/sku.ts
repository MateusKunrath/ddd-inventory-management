export class Sku {
  value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(sku: string) {
    return new Sku(sku)
  }
}
