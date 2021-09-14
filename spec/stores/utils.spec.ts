import { useSelectable } from '../../src/stores/utils'
import { readable, get } from 'svelte/store'
import type { StoreEntityBase } from '../../src/models/entities'

describe('stores/utils', () => {
  describe('useSelectable', () => {
    const entities = readable<StoreEntityBase<{ id: string }>>({
      byId: {
        a: { id: 'a' },
        b: { id: 'b' },
        c: { id: 'c' },
      },
      allIds: ['a', 'b', 'c'],
    })

    describe('selectedIds', () => {
      it('should return selected ids', () => {
        const target = useSelectable(entities)
        target.select('a')
        target.select('b', true)
        expect(get(target.selectedIds)).toEqual({ a: true, b: true })
        expect(get(target.lastSelectedId)).toBe('b')
      })
    })
  })
})
