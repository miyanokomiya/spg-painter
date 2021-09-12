import { writable, derived } from 'svelte/store'
import type { Readable } from 'svelte/store'
import type { StoreEntityBase } from '../models/entities'

export function useSelectable<T>(entities: Readable<StoreEntityBase<T>>): {
  selectedIds: Readable<Map<string, true>>
  selectedList: Readable<T[]>
  lastSelectedId: Readable<string>
  lastSelected: Readable<T | undefined>
  select: (id: string, shift?: boolean) => void
} {
  const selectedIds = writable(new Map<string, true>())
  const lastSelectedId = derived([selectedIds], ([$selectedElementIds]) => {
    const keys = Array.from($selectedElementIds.keys())
    return keys[keys.length - 1]
  })
  const selectedList = derived(
    [entities, selectedIds],
    ([$entities, $selectedIds]) => {
      return Array.from($selectedIds.keys())
        .map((id) => $entities.byId[id])
        .filter((elm) => !!elm)
    }
  )
  const lastSelected = derived(
    [entities, lastSelectedId],
    ([$entities, $lastSelectedId]) => {
      return $entities.byId[$lastSelectedId]
    }
  )

  function select(id: string, shift = false): void {
    if (!shift) {
      selectedIds.set(new Map([[id, true]]))
    } else {
      selectedIds.update((val) => {
        if (val.has(id)) {
          val.delete(id)
        } else {
          val.set(id, true)
        }
        return val
      })
    }
  }

  return {
    selectedIds,
    selectedList,
    lastSelectedId,
    lastSelected,
    select,
  }
}
