import { CANVAS_ANCHOR_TYPE, getAnchor } from '../../src/utils/canvas'

describe('src/utils/canvas.ts', () => {
  describe('getAnchor', () => {
    it('should return an anchor info of the target', () => {
      const elm = document.createElement('div')
      elm.dataset.anchorType = CANVAS_ANCHOR_TYPE.CANVAS
      elm.dataset.anchorId = 'a'
      expect(getAnchor(elm)).toEqual({
        type: CANVAS_ANCHOR_TYPE.CANVAS,
        id: 'a',
      })
    })
    it('should return undefined if the target does not have an anchor info', () => {
      const elm = document.createElement('div')
      expect(getAnchor(elm)).toBe(undefined)
    })
  })
})
