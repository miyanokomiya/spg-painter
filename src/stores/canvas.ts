import { writable } from 'svelte/store'
import type { Readable } from 'svelte/store'
import { sub } from 'okageo'
import type { IVec2 } from 'okageo'
import { useCanvas } from './utils'

const ZOOM_RATE = 1.1

const canvas = useCanvas({
  zoomRate: ZOOM_RATE,
  zoomMax: Math.pow(ZOOM_RATE, 20),
  zoomMin: Math.pow(ZOOM_RATE, -20),
})

export const viewSize: Readable<{ width: number; height: number }> =
  canvas.viewSize
export const viewBox = canvas.viewBox

export const downAt = writable<IVec2>({ x: 0, y: 0 })
export const moveBy = writable<IVec2>({ x: 0, y: 0 })

export function onDown(p: IVec2, _options?: { ctrl: boolean }): void {
  downAt.update(() => canvas.toCanvasPosition(p))
}
export function onMove(_p: IVec2, _options?: { ctrl: boolean }): void {
  // TODO
}
export function onDrag(
  p: IVec2,
  delta: IVec2,
  _options?: { ctrl: boolean }
): void {
  canvas.origin.update((old) => {
    return sub(old, canvas.toCanvasVector(delta))
  })
}
export function onUp(): void {
  moveBy.update(() => ({ x: 0, y: 0 }))
}
export function onWheel(
  p: IVec2,
  delta: IVec2,
  _options?: { ctrl: boolean }
): void {
  canvas.zoom(
    canvas.toCanvasPosition(p),
    delta.y < 0 ? 1 / ZOOM_RATE : ZOOM_RATE
  )
}
