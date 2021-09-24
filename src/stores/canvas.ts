import { get, writable } from 'svelte/store'
import type { IVec2 } from 'okageo'
import { useCanvas } from './utils'
import type { CanvasMode } from '../modes/core'
import { createCanvasMode } from '../modes'

const ZOOM_RATE = 1.1

const canvas = useCanvas({
  zoomRate: ZOOM_RATE,
  zoomMax: Math.pow(ZOOM_RATE, 20),
  zoomMin: Math.pow(ZOOM_RATE, -20),
})

export const viewSize = canvas.viewSize
export const viewBox = canvas.viewBox

const mode = writable<CanvasMode | undefined>()
setMode('hand')

export function setMode(name: string): void {
  const next = createCanvasMode(name, canvas)
  mode.update((old) => {
    old?.onEnd()
    next.onBegin()
    return next
  })
}

export function onDown(p: IVec2, options?: { ctrl: boolean }): void {
  get(mode)?.onDown(canvas.toCanvasPosition(p), options)
}
export function onMove(p: IVec2, v: IVec2, options?: { ctrl: boolean }): void {
  get(mode)?.onMove(
    canvas.toCanvasPosition(p),
    canvas.toCanvasVector(v),
    options
  )
}
export function onUp(): void {
  get(mode)?.onUp()
}
export function onWheel(
  p: IVec2,
  delta: IVec2,
  options?: { ctrl: boolean }
): void {
  get(mode)?.onWheel(canvas.toCanvasPosition(p), delta, options)
}
