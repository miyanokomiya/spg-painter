import { getNorm, sub } from 'okageo'
import type { IVec2 } from 'okageo'
import type { CanvasModule } from '../stores/utils'
import type {
  CanvasMode,
  LayerContext,
  PointerAnchor,
  PointerOption,
} from './core'
import { CANVAS_ANCHOR_TYPE } from '../utils/canvas'
import { mapObject } from '../utils/items'
import { translateElement } from '../models/elements'

export class HandMode implements CanvasMode {
  name = 'hand'
  canvas: CanvasModule
  layerContext: LayerContext
  anchor: PointerAnchor | undefined
  downAt: IVec2 | undefined
  moveAt: IVec2 | undefined
  dragAmount = 0
  downTimestamp = 0

  constructor(canvas: CanvasModule, layerContext: LayerContext) {
    this.canvas = canvas
    this.layerContext = layerContext
  }

  onBegin(): void {}
  onEnd(): void {}

  onDown(p: IVec2, options?: PointerOption): void {
    console.log('anchor', options?.anchor)
    this.anchor = options?.anchor
    this.downAt = p
    this.moveAt = p
    this.downTimestamp = Date.now()
  }

  onMove(p: IVec2, v: IVec2, _options?: PointerOption): void {
    if (this.downAt && this.moveAt) {
      switch (this.anchor?.type) {
        case CANVAS_ANCHOR_TYPE.CANVAS:
          this.canvas.origin.update((old) => sub(old, v))
          break
        case CANVAS_ANCHOR_TYPE.ANCHOR_TRANSLATE:
          this.layerContext.updateElements(
            mapObject(this.layerContext.getSelectedElements(), (elm) =>
              translateElement(elm, v)
            ),
            `translate_${this.downTimestamp}`
          )
          break
      }

      this.dragAmount = this.dragAmount + getNorm(v)
    }
    this.moveAt = p
  }

  onUp(): void {
    switch (this.anchor?.type) {
      case CANVAS_ANCHOR_TYPE.CANVAS:
        if (!this.isDragged) {
          this.layerContext.clearSelectedElement()
        }
        break
      case CANVAS_ANCHOR_TYPE.ANCHOR_SELECT:
        if (!this.isDragged) {
          this.layerContext.selectElement(this.anchor.id)
        }
        break
    }

    this.anchor = undefined
    this.downAt = undefined
    this.moveAt = undefined
    this.dragAmount = 0
  }

  onWheel(p: IVec2, delta: IVec2): void {
    const canvas = this.canvas
    canvas.zoom(p, delta.y < 0 ? 1 / canvas.ZOOM_RATE : canvas.ZOOM_RATE)
  }

  private get isDragged() {
    return this.dragAmount > 1
  }
}
