import { writable, derived, get } from 'svelte/store'
import type { Readable } from 'svelte/store'
import * as okaselect from 'okaselect'
import type { StoreEntityBase } from '../models/entities'

export function useSelectable<T>(entities: Readable<StoreEntityBase<T>>): {
  selectedIds: Readable<{ [id: string]: true }>
  selectedList: Readable<T[]>
  lastSelectedId: Readable<string | undefined>
  lastSelected: Readable<T | undefined>
  select: (id: string, shift?: boolean) => void
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

  const lastSelected = derived([selectable], ([$selectable]) => {
    const id = $selectable.getLastSelectedId()
    return id ? get(entities).byId[id] : undefined
  })

  function select(id: string, ctrl = false): void {
    selectable.update((val) => {
      val.select(id, ctrl)
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
    selectAll,
    clearAll,
  }
}
