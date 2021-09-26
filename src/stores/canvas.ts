import type { Readable } from 'svelte/store'
import { get, writable } from 'svelte/store'
import type { IVec2 } from 'okageo'
import { useCanvas } from './utils'
import type { CanvasMode, LayerContext, PointerOption } from '../modes/core'
import { createCanvasMode } from '../modes'
import * as layerStore from './layers'

const ZOOM_RATE = 1.1

const canvas = useCanvas({
  zoomRate: ZOOM_RATE,
  zoomMax: Math.pow(ZOOM_RATE, 20),
  zoomMin: Math.pow(ZOOM_RATE, -20),
})

export const viewSize = canvas.viewSize
export const viewBox = canvas.viewBox
export const scale: Readable<number> = canvas.scale

const mode = writable<CanvasMode | undefined>()

function createLayerContext(): LayerContext {
  return {
    addElement: layerStore.addElement,
    updateElements: layerStore.updateElements,
    removeElement: layerStore.removeElement,
    selectElement: layerStore.selectElement,
    clearSelectedElement: layerStore.clearSelectedElement,
    getSelectedElements: layerStore.getSelectedElements,
  }
}

export function setMode(name: string): void {
  const next = createCanvasMode(name, canvas, createLayerContext())
  mode.update((old) => {
    old?.onEnd()
    next.onBegin()
    return next
  })
}
setMode('hand')

export function onDown(p: IVec2, options?: PointerOption): void {
  get(mode)?.onDown(canvas.toCanvasPosition(p), options)
}
export function onMove(p: IVec2, v: IVec2, options?: PointerOption): void {
  get(mode)?.onMove(
    canvas.toCanvasPosition(p),
    canvas.toCanvasVector(v),
    options
  )
}
export function onUp(options?: PointerOption): void {
  get(mode)?.onUp(options)
}
export function onWheel(p: IVec2, delta: IVec2, options?: PointerOption): void {
  get(mode)?.onWheel(canvas.toCanvasPosition(p), delta, options)
}
