import { useModuleMap } from '../../src/composables/moduleMap'

describe('src/composables/moduleMap.ts', () => {
  describe('useModuleMap', () => {
    it('should return a function to regist and get modules', () => {
      const target = useModuleMap<number>()
      target.registModule('a', 1)
      target.registModule('b', 2)
      expect(target.getModule('a')).toBe(1)
      expect(target.getModule('b')).toBe(2)
    })
  })
})
