import type { IVec2 } from 'okageo'
import { useModuleMap } from '../composables/moduleMap'
import type { CanvasModule } from '../stores/utils'

export type PointerAnchor = { type: string; id: string }

export type PointerOption = {
  anchor?: PointerAnchor
  ctrl?: boolean
}

export interface CanvasMode {
  name: string
  canvas: CanvasModule

  onBegin(): void
  onEnd(): void
  onDown(p: IVec2, options?: PointerOption): void
  onMove(p: IVec2, v: IVec2, options?: PointerOption): void
  onUp(): void
  onWheel(p: IVec2, delta: IVec2, options?: PointerOption): void
}

export interface CanvasModeConstructor {
  new (canvas: CanvasModule): CanvasMode
}

export const canvasModeMap = useModuleMap<CanvasModeConstructor>()
