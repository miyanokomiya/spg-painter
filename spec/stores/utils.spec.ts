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

    describe('when shift is false', () => {
      it('should replace the id', () => {
        const target = useSelectable(entities)
        target.select('a')
        expect(get(target.selectedIds)).toEqual(new Map([['a', true]]))
        expect(get(target.lastSelectedId)).toBe('a')
      })
    })

    describe('when shift is true', () => {
      it('should add the id if it has not been saved', () => {
        const target = useSelectable(entities)
        target.select('a', true)
        expect(get(target.selectedIds)).toEqual(new Map([['a', true]]))
        target.select('c', true)
        expect(get(target.selectedIds)).toEqual(
          new Map([
            ['a', true],
            ['c', true],
          ])
        )
      })
      it('should remove the id if it has been saved', () => {
        const target = useSelectable(entities)
        target.select('a', true)
        target.select('c', true)
        target.select('a', true)
        expect(get(target.selectedIds)).toEqual(new Map([['c', true]]))
      })
    })
  })
})
