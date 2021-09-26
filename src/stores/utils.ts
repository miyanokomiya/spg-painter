import { writable, derived, get } from 'svelte/store'
import type { Readable, Writable } from 'svelte/store'
import * as okaselect from 'okaselect'
import type { StoreEntityBase } from '../models/entities'
import type { IVec2 } from 'okageo'
import { add, sub, multi } from 'okageo'

export function useSelectable<T>(entities: Readable<StoreEntityBase<T>>): {
  selectedIds: Readable<{ [id: string]: true }>
  selectedList: Readable<T[]>
  lastSelectedId: Readable<string | undefined>
  lastSelected: Readable<T | undefined>
  select: (id: string, ctrl?: boolean) => void
  multiSelect: (ids: string[], ctrl?: boolean) => void
  selectAll: () => void
  clearAll: () => void
} {
  const selectable = writable(
    okaselect.useSelectable<T>(() => get(entities).byId)
  )

  const lastSelectedId = derived([selectable], ([$selectable]) => {
    return $selectable.getLastSelectedId() as string
  })

  const selectedIds = derived([selectable], ([$selectable]) => {
    return $selectable
      .getSelectedIds()
      .reduce<{ [id: string]: true }>((ids, id) => {
        ids[id] = true
        return ids
      }, {})
  })

  const selectedList = derived([selectable], ([$selectable]) => {
    return $selectable.getSelectedItems()
  })

  const lastSelected = derived(
    [selectable, entities],
    ([$selectable, $entities]) => {
      const id = $selectable.getLastSelectedId()
      return id ? $entities.byId[id] : undefined
    }
  )

  function select(id: string, ctrl = false): void {
    selectable.update((val) => {
      val.select(id, ctrl)
      return val
    })
  }

  function multiSelect(ids: string[], ctrl = false): void {
    selectable.update((val) => {
      val.multiSelect(ids, ctrl)
      return val
    })
  }

  function selectAll(): void {
    selectable.update((val) => {
      val.selectAll()
      return val
    })
  }

  function clearAll(): void {
    selectable.update((val) => {
      val.clearAll()
      return val
    })
  }

  return {
    selectedIds,
    selectedList,
    lastSelectedId,
    lastSelected,

    select,
    multiSelect,
    selectAll,
    clearAll,
  }
}

export interface CanvasModule {
  ZOOM_RATE: number
  viewSize: Writable<{ width: number; height: number }>
  scale: Writable<number>
  origin: Writable<IVec2>
  viewBox: Readable<string>
  toViewPosition: (v: IVec2) => IVec2
  toViewVector: (v: IVec2) => IVec2
  toCanvasPosition: (v: IVec2) => IVec2
  toCanvasVector: (v: IVec2) => IVec2
  zoom: (base: IVec2, rate: number) => void
}

export function useCanvas(options: {
  zoomRate?: number
  zoomMax?: number
  zoomMin?: number
}): CanvasModule {
  const ZOOM_RATE = options?.zoomRate ?? 1.1
  const ZOOM_MAX = options?.zoomMax ?? Math.pow(ZOOM_RATE, 20)
  const ZOOM_MIN = options?.zoomMin ?? Math.pow(ZOOM_RATE, -20)

  const viewSize = writable<{ width: number; height: number }>({
    width: 0,
    height: 0,
  })
  const scale = writable(1)
  const origin = writable<IVec2>({ x: 0, y: 0 })

  const viewBox = derived(
    [viewSize, scale, origin],
    ([$viewSize, $scale, $origin]) => {
      return `${$origin.x} ${$origin.y} ${$viewSize.width * $scale} ${
        $viewSize.height * $scale
      }`
    }
  )

  function toViewPosition(v: IVec2): IVec2 {
    return toViewVector(sub(v, get(origin)))
  }
  function toViewVector(v: IVec2): IVec2 {
    return multi(v, 1 / get(scale))
  }
  function toCanvasPosition(v: IVec2): IVec2 {
    return add(toCanvasVector(v), get(origin))
  }
  function toCanvasVector(v: IVec2): IVec2 {
    return multi(v, get(scale))
  }

  function zoom(base: IVec2, rate: number): void {
    const afterScale = Math.min(Math.max(get(scale) * rate, ZOOM_MIN), ZOOM_MAX)
    const beforeBaseView = toViewPosition(base)
    const afterBaseView = multi(sub(base, get(origin)), 1 / afterScale)
    const diff = multi(sub(beforeBaseView, afterBaseView), afterScale)
    scale.set(afterScale)
    origin.update((old) => sub(old, diff))
  }

  return {
    ZOOM_RATE,
    viewSize,
    scale,
    origin,
    viewBox,
    toViewPosition,
    toViewVector,
    toCanvasPosition,
    toCanvasVector,
    zoom,
  }
}
