import { writable, derived, get } from 'svelte/store'
import { createElement } from '../models/elements/index'
import type { ElementBase } from '../models/elements/core'

interface Layer {
  id: string
  elements: ElementBase[]
}

function getLayer() {
  return {
    id: Math.random().toString(),
    elements: [],
  }
}

export const layers = writable<Layer[]>([{ ...getLayer(), id: 'root' }])

const currentLayerId = writable('root')
export const currentLayer = derived(
  [layers, currentLayerId],
  ([$layers, $currentLayerId]) => {
    return $layers.find((l) => l.id === $currentLayerId)
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
  [currentLayer, selectedElementIds],
  ([$currentLayer, $selectedElementIds]) => {
    return (
      $currentLayer?.elements.filter((elm) =>
        $selectedElementIds.has(elm.id)
      ) ?? []
    )
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
    const next = [...old]
    const index = next.findIndex((l) => l.id === get(currentLayerId))
    next[index] = {
      ...next[index],
      elements: [...next[index].elements, elm],
    }
    return next
  })
  selectElement(elm.id)

  return elm.id
}
