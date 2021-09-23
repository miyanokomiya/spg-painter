import { getNorm, sub } from 'okageo'
import type { IVec2 } from 'okageo'
import type { CanvasModule } from '../stores/utils'
import type { CanvasMode, PointerAnchor, PointerOption } from './core'

export class HandMode implements CanvasMode {
  name = 'hand'
  canvas: CanvasModule
  anchor: PointerAnchor | undefined
  downAt: IVec2 | undefined
  moveAt: IVec2 | undefined
  dragAmount = 0

  constructor(canvas: CanvasModule) {
    this.canvas = canvas
  }

  onBegin(): void {}
  onEnd(): void {}

  onDown(p: IVec2, options?: PointerOption): void {
    this.anchor = options?.anchor
    this.downAt = p
    this.moveAt = p
  }

  onMove(p: IVec2, v: IVec2, _options?: PointerOption): void {
    if (this.downAt && this.moveAt) {
      this.canvas.origin.update((old) => sub(old, v))
      this.dragAmount = this.dragAmount + getNorm(v)
    }
    this.moveAt = p
  }

  onUp(): void {
    if (!this.isDragged()) {
      console.log('clear')
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

  private isDragged(): boolean {
    return this.dragAmount > 1
  }
}
