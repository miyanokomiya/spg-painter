import type { CanvasModule } from '../stores/utils'
import type { CanvasMode } from './core'
import { canvasModeMap } from './core'
import { HandMode } from './HandMode'

canvasModeMap.registModule('hand', HandMode)

export function createCanvasMode(
  name: string,
  canvas: CanvasModule
): CanvasMode {
  return new (canvasModeMap.getModule(name))(canvas)
}
