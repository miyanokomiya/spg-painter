import type { IVec2 } from 'okageo'
import { useModuleMap } from '../composables/moduleMap'
import type { ElementBase } from '../models/entities'
import type { CanvasModule } from '../stores/utils'
import type { CANVAS_ANCHOR_TYPE_KEY } from '../utils/canvas'
import type { IdMap } from '../utils/items'

export type PointerAnchor = { type: CANVAS_ANCHOR_TYPE_KEY; id: string }

export type PointerOption = {
  anchor?: PointerAnchor
  ctrl?: boolean
}

export interface CanvasMode {
  name: string
  canvas: CanvasModule
  layerContext: LayerContext

  onBegin(): void
  onEnd(): void
  onDown(p: IVec2, options?: PointerOption): void
  onMove(p: IVec2, v: IVec2, options?: PointerOption): void
  onUp(options?: PointerOption): void
  onWheel(p: IVec2, delta: IVec2, options?: PointerOption): void
}

export interface CanvasModeConstructor {
  new (canvas: CanvasModule, layerContext: LayerContext): CanvasMode
}

export const canvasModeMap = useModuleMap<CanvasModeConstructor>()

export interface LayerContext {
  addElement(
    name: string,
    arg?: Partial<ElementBase>,
    getId?: () => string
  ): void
  updateElements(elementsById: IdMap<ElementBase>, seriesKey?: string): void
  removeElement(id: string): void
  selectElement(id: string, options?: { ctrl?: boolean }): void
  clearSelectedElement(): void
  getSelectedElements(): IdMap<ElementBase>
}
