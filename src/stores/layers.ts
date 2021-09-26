import { writable, derived, get } from 'svelte/store'
import { createElement } from '../models/elements/index'
import type { StoreEntities, ElementBase } from '../models/entities'
import { createLayer, createId } from '../models/entities'
import { useSelectable } from './utils'
import type { IdMap } from '../utils/items'
import { extractObject, mapObject } from '../utils/items'
import { defineReducer, dispatch } from './history'
import {
  addEntity,
  removeEntity,
  updateEntities,
  updateEntity,
} from '../utils/entities'

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
      root: { ...createLayer({ id: 'root' }) },
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
export const selectedElementIds = elementSelectable.selectedIds

export function getSelectedElements(): IdMap<ElementBase> {
  const byId = get(elements).byId
  return mapObject(get(selectedElementIds), (_, id) => byId[id])
}

const ACTION_NAMES = {
  ADD_LAYER: 'ADD_LAYER',
  ADD_ELEMENT: 'ADD_ELEMENT',
  UPDATE_ELEMENTS: 'UPDATE_ELEMENTS',
  SELECT_ELEMENT: 'SELECT_ELEMENT',
  CLEAR_SELECTED_ELEMENTS: 'CLEAR_SELECTED_ELEMENTS',
}

defineReducer(ACTION_NAMES.ADD_LAYER, {
  undo: (args) => {
    layers.update((old) => {
      return removeEntity(old, args.id)
    })
    layerSelectable.multiSelect(args.selectedIds)
  },
  redo: (args: { id: string }) => {
    const selectedIds = get(layerSelectable.selectedList).map((elm) => elm.id)
    const created = createLayer({ id: args.id })
    layers.update((old) => {
      return addEntity(old, created.id, created)
    })
    layerSelectable.select(args.id)
    return {
      id: args.id,
      selectedIds,
    }
  },
  getLabel: () => 'Add Layer',
})

defineReducer(ACTION_NAMES.ADD_ELEMENT, {
  undo: (args) => {
    if (!args) return

    layers.update((old) => {
      const target = old.byId[args.layerId]
      return updateEntity(old, args.layerId, {
        ...target,
        elements: target.elements.filter((id) => id !== args.elementId),
      })
    })
    elements.update((old) => {
      return removeEntity(old, args.elementId)
    })
    elementSelectable.multiSelect(args.selectedIds)
  },
  redo: (args: { element: ElementBase }) => {
    const elm = args.element
    const targetLayer = get(lastSelectedLayer)
    if (!targetLayer) return

    const selectedIds = get(elementSelectable.selectedList).map((elm) => elm.id)
    layers.update((old) => {
      return updateEntity(old, targetLayer.id, {
        ...targetLayer,
        elements: [...targetLayer.elements, elm.id],
      })
    })
    elements.update((old) => {
      return addEntity(old, elm.id, elm)
    })
    elementSelectable.select(elm.id)

    return { layerId: targetLayer.id, elementId: elm.id, selectedIds }
  },
  getLabel: () => 'Add Element',
})

defineReducer(ACTION_NAMES.UPDATE_ELEMENTS, {
  undo: (args) => {
    if (!args) return

    elements.update((old) => {
      return updateEntities(old, args.snapshot)
    })
  },
  redo: (args: { elementsById: IdMap<ElementBase> }) => {
    const targetLayer = get(lastSelectedLayer)
    if (!targetLayer) return

    const snapshot = extractObject(
      get(elements).byId,
      (elm) => !!args.elementsById[elm.id]
    )

    elements.update((old) => {
      return updateEntities(old, args.elementsById)
    })

    return { snapshot }
  },
  getLabel: () => 'Update Element',
})

defineReducer(ACTION_NAMES.SELECT_ELEMENT, {
  undo: (snapshot) => {
    elementSelectable.multiSelect(Object.keys(snapshot))
  },
  redo: (args: { id: string; options?: { ctrl?: boolean } }) => {
    const snapshot = get(elementSelectable.selectedIds)
    elementSelectable.select(args.id, args.options?.ctrl)
    return snapshot
  },
  getLabel: () => 'Select Element',
  ignoreDuplication: true,
  checkDuplicationFn: (a, b) => {
    return !a.options?.ctrl && !b.options?.ctrl && a.id === b.id
  },
})

defineReducer(ACTION_NAMES.CLEAR_SELECTED_ELEMENTS, {
  undo: (snapshot) => {
    elementSelectable.multiSelect(Object.keys(snapshot))
  },
  redo: () => {
    const snapshot = get(elementSelectable.selectedIds)
    elementSelectable.clearAll()
    return snapshot
  },
  getLabel: () => 'Clear Selected',
  ignoreDuplication: true,
})

export function addLayer(): void {
  dispatch({
    name: ACTION_NAMES.ADD_LAYER,
    args: { id: createId() },
  })
}

export function selectElement(id: string, options?: { ctrl?: boolean }): void {
  dispatch({
    name: ACTION_NAMES.SELECT_ELEMENT,
    args: { id, options },
  })
}

export function clearSelectedElement(): void {
  dispatch({
    name: ACTION_NAMES.CLEAR_SELECTED_ELEMENTS,
    args: undefined,
  })
}

export function addElement(
  name: string,
  arg?: Partial<ElementBase>,
  getId?: () => string
): string | undefined {
  const layer = get(lastSelectedLayer)
  if (!layer) return

  const elm = createElement(name, arg, getId)
  dispatch({
    name: ACTION_NAMES.ADD_ELEMENT,
    args: { element: elm },
  })

  return elm.id
}

export function updateElements(
  elementsById: IdMap<ElementBase>,
  seriesKey?: string
): void {
  const layer = get(lastSelectedLayer)
  if (!layer) return

  dispatch({
    name: ACTION_NAMES.UPDATE_ELEMENTS,
    args: { elementsById },
    seriesKey,
  })
}

export function removeElement(id: string): void {
  // TODO
  console.log('remove', id)
}
