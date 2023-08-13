import { LinkEntity } from "./link-entity"

export interface IndexEntity<T> {
  Data: T[],
  Limit: number,
  Links: {
    current?: LinkEntity,
    next?: LinkEntity
    prev?: LinkEntity
  },
  Offset: number,
  Total: number
}
