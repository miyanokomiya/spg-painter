import { writable, derived, get } from 'svelte/store'
import { createElement } from '../models/elements/index'
import type { StoreEntities, ElementBase } from '../models/entities'

function getLayer() {
  return {
    id: Math.random().toString(),
    elements: [],
  }
}

const layers = writable<StoreEntities['layers']>({
  byId: {
    root: { ...getLayer(), id: 'root' },
  },
  allIds: ['root'],
})
const elements = writable<StoreEntities['elements']>({
  byId: {},
  allIds: [],
})

const currentLayerId = writable('root')
export const currentLayer = derived(
  [layers, currentLayerId],
  ([$layers, $currentLayerId]) => {
    return $layers.byId[$currentLayerId]
  }
)
export const currentLayerElements = derived(
  [elements, currentLayer],
  ([$elements, $currentLayer]) => {
    return $currentLayer.elements.map((id) => $elements.byId[id])
  }
)

const selectedElementIds = writable(new Map<string, boolean>())
export const lastSelectedElementId = derived(
  [selectedElementIds],
  ([$selectedElementIds]) => {
    return Array.from($selectedElementIds.keys()).at(-1)
  }
)
export const selectedElement = derived(
  [elements, selectedElementIds],
  ([$elements, $selectedElementIds]) => {
    return Array.from($selectedElementIds.keys())
      .map((id) => $elements.byId[id])
      .filter((elm) => !!elm)
  }
)

export function selectElement(id: string): void {
  selectedElementIds.update(() => {
    return new Map([[id, true]])
  })
}

export function addElement(
  name: string,
  arg?: Partial<ElementBase>,
  getId?: () => string
): string | undefined {
  const layer = get(currentLayer)
  if (!layer) return

  const elm = createElement(name, arg, getId)

  layers.update((old) => {
    const targetLayer = get(currentLayer)
    return {
      ...old,
      byId: {
        ...old.byId,
        [targetLayer.id]: {
          ...targetLayer,
          elements: [...targetLayer.elements, elm.id],
        },
      },
    }
  })

  elements.update((old) => {
    return {
      ...old,
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
