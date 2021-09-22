import * as target from '../../src/utils/items'

describe('src/utils/items.ts', () => {
  describe('extract', () => {
    it('should extract items returning true value from the check function', () => {
      expect(target.extract({ a: 1, b: 2 }, (v) => v % 2 === 0)).toEqual({
        b: 2,
      })
    })
  })
})
