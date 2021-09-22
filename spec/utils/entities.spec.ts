import * as target from '../../src/utils/entities'

describe('src/utils/entities.spec.ts', () => {
  describe('addEntity', () => {
    it('should add new entity', () => {
      expect(
        target.addEntity(
          {
            byId: { a: 1 },
            allIds: ['a'],
          },
          'b',
          2
        )
      ).toEqual({
        byId: { a: 1, b: 2 },
        allIds: ['a', 'b'],
      })
    })
  })

  describe('updateEntity', () => {
    it('should update the entity', () => {
      expect(
        target.updateEntity(
          {
            byId: { a: 1, b: 2 },
            allIds: ['a', 'b'],
          },
          'b',
          3
        )
      ).toEqual({
        byId: { a: 1, b: 3 },
        allIds: ['a', 'b'],
      })
    })
  })

  describe('removeEntity', () => {
    it('should remove the entity', () => {
      expect(
        target.removeEntity(
          {
            byId: { a: 1, b: 2 },
            allIds: ['a', 'b'],
          },
          'b'
        )
      ).toEqual({
        byId: { a: 1 },
        allIds: ['a'],
      })
    })
  })
})
