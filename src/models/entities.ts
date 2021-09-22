export interface StoreEntityBase<T> {
  byId: { [id: string]: T }
  allIds: string[]
}

export interface StoreEntities {
  layers: StoreEntityBase<Layer>
  elements: StoreEntityBase<ElementBase>
}

export interface Layer {
  id: string
  elements: string[]
}

export interface ElementBase {
  id: string
  name: string
  fill: string
  stroke: string
}

export function createId(): string {
  return `${Math.random()}`
}

export function createLayer(arg?: Partial<Layer>, getId?: () => string): Layer {
  const id = getId?.() ?? arg?.id ?? ''
  return {
    elements: [],
    ...arg,
    id,
  }
}
