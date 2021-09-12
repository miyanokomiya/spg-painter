import { writable, derived, get } from 'svelte/store'
import { createElement } from '../models/elements/index'
import type { StoreEntities, ElementBase } from '../models/entities'
import { useSelectable } from './utils'

function createLayer() {
  return {
    id: Math.random().toString(),
    elements: [],
  }
}

const layers = writable<StoreEntities['layers']>({
  byId: {},
  allIds: [],
})
const elements = writable<StoreEntities['elements']>({
  byId: {},
  allIds: [],
})

export function init(): void {
  layers.set({
    byId: {
      root: { ...createLayer(), id: 'root' },
    },
    allIds: ['root'],
  })
  elements.set({ byId: {}, allIds: [] })
  layerSelectable.select('root')
}

const layerSelectable = useSelectable(layers)
export const lastSelectedLayer = layerSelectable.lastSelected
export const lastSelectedLayerElements = derived(
  [elements, lastSelectedLayer],
  ([$elements, $lastSelectedLayer]) => {
    return $lastSelectedLayer?.elements.map((id) => $elements.byId[id]) ?? []
  }
)

const elementSelectable = useSelectable(elements)
export const lastSelectedElementId = elementSelectable.lastSelectedId
export const selectedElement = elementSelectable.lastSelected

export function selectElement(id: string): void {
  elementSelectable.select(id)
}

export function addLayer(): void {
  const created = createLayer()
  layers.update((old) => {
    return {
      byId: {
        ...old.byId,
        [created.id]: created,
      },
      allIds: [...old.allIds, created.id],
    }
  })
  layerSelectable.select(created.id)
}

export function addElement(
  name: string,
  arg?: Partial<ElementBase>,
  getId?: () => string
): string | undefined {
  const layer = get(lastSelectedLayer)
  if (!layer) return

  const elm = createElement(name, arg, getId)

  layers.update((old) => {
    const targetLayer = get(lastSelectedLayer)
    return {
      byId: {
        ...old.byId,
        [targetLayer.id]: {
          ...targetLayer,
          elements: [...targetLayer.elements, elm.id],
        },
      },
      allIds: old.allIds,
    }
  })

  elements.update((old) => {
    return {
      byId: {
        ...old.byId,
        [elm.id]: elm,
      },
      allIds: [...old.allIds, elm.id],
    }
  })

  selectElement(elm.id)

  return elm.id
}
