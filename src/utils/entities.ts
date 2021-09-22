import type { StoreEntityBase } from '../models/entities'
import { extract } from './items'

export function addEntity<T>(
  src: StoreEntityBase<T>,
  id: string,
  entity: T
): StoreEntityBase<T> {
  return {
    byId: { ...src.byId, [id]: entity },
    allIds: [...src.allIds, id],
  }
}

export function updateEntity<T>(
  src: StoreEntityBase<T>,
  id: string,
  entity: T
): StoreEntityBase<T> {
  return {
    byId: {
      ...src.byId,
      [id]: entity,
    },
    allIds: src.allIds,
  }
}

export function removeEntity<T>(
  src: StoreEntityBase<T>,
  id: string
): StoreEntityBase<T> {
  return {
    byId: extract(src.byId, (_, key) => key !== id),
    allIds: src.allIds.filter((key) => key !== id),
  }
}
