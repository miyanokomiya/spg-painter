import * as target from '../../src/utils/items'

describe('src/utils/items.ts', () => {
  describe('extractObject', () => {
    it('should extract items returning true value from the check function', () => {
      expect(target.extractObject({ a: 1, b: 2 }, (v) => v % 2 === 0)).toEqual({
        b: 2,
      })
    })
  })

  describe('mapValues', () => {
    it('should return transformed object by calling mapping funciton', () => {
      const src = { a: 1, b: 2 }
      expect(target.mapValues(src, (v) => v + 10)).toEqual({
        a: 11,
        b: 12,
      })
      expect(src).toEqual({ a: 1, b: 2 })
    })
  })
})
