import type { StoreEntityBase } from '../models/entities'
import { extractObject } from './items'

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

export function updateEntities<T>(
  src: StoreEntityBase<T>,
  entitiesById: { [id: string]: T }
): StoreEntityBase<T> {
  return {
    byId: { ...src.byId, ...entitiesById },
    allIds: src.allIds,
  }
}

export function removeEntity<T>(
  src: StoreEntityBase<T>,
  id: string
): StoreEntityBase<T> {
  return {
    byId: extractObject(src.byId, (_, key) => key !== id),
    allIds: src.allIds.filter((key) => key !== id),
  }
}
