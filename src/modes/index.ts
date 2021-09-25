import type { CanvasModule } from '../stores/utils'
import type { CanvasMode, LayerContext } from './core'
import { canvasModeMap } from './core'
import { HandMode } from './HandMode'

canvasModeMap.registModule('hand', HandMode)

export function createCanvasMode(
  name: string,
  canvas: CanvasModule,
  layerContext: LayerContext
): CanvasMode {
  return new (canvasModeMap.getModule(name))(canvas, layerContext)
}
