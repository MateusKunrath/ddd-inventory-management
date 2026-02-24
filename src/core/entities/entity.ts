import { UniqueEntityId } from './unique-entity-id'

export abstract class Entity<TProps> {
  private _id: UniqueEntityId
  protected props: TProps

  get id() {
    return this._id
  }

  protected constructor(props: TProps, id?: UniqueEntityId) {
    this.props = props
    this._id = id ?? new UniqueEntityId(id)
  }

  equals(entity: Entity<unknown>): boolean {
    if (entity === this) {
      return true
    }

    if (entity.id === this._id) {
      return true
    }

    return false
  }
}
