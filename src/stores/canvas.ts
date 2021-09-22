import { derived, writable, get } from 'svelte/store'
import { add, multi, sub } from 'okageo'
import type { IVec2 } from 'okageo'

const ZOOM_RATE = 1.1
const ZOOM_MAX = Math.pow(ZOOM_RATE, 20)
const ZOOM_MIN = Math.pow(ZOOM_RATE, -20)

export const viewSize = writable<{ width: number; height: number }>({
  width: 0,
  height: 0,
})
export const scale = writable(1)
export const origin = writable<IVec2>({ x: 0, y: 0 })

export const downAt = writable<IVec2>({ x: 0, y: 0 })
export const moveBy = writable<IVec2>({ x: 0, y: 0 })

export const viewBox = derived(
  [viewSize, scale, origin],
  ([$viewSize, $scale, $origin]) => {
    return `${$origin.x} ${$origin.y} ${$viewSize.width * $scale} ${
      $viewSize.height * $scale
    }`
  }
)

export function toViewPosition(v: IVec2): IVec2 {
  return multi(sub(v, get(origin)), 1 / get(scale))
}

export function toCanvasPosition(v: IVec2): IVec2 {
  return add(toCanvasVector(v), get(origin))
}
export function toCanvasVector(v: IVec2): IVec2 {
  return multi(v, get(scale))
}

export function zoom(base: IVec2, rate: number): void {
  const afterScale = Math.min(Math.max(get(scale) * rate, ZOOM_MIN), ZOOM_MAX)
  const beforeBaseView = toViewPosition(base)
  const afterBaseView = multi(sub(base, get(origin)), 1 / afterScale)
  const diff = multi(sub(beforeBaseView, afterBaseView), afterScale)
  scale.set(afterScale)
  origin.update((old) => sub(old, diff))
}

export function onDown(p: IVec2, _options?: { ctrl: boolean }): void {
  downAt.update(() => toCanvasPosition(p))
}
export function onMove(_p: IVec2, _options?: { ctrl: boolean }): void {
  // TODO
}
export function onDrag(
  p: IVec2,
  delta: IVec2,
  _options?: { ctrl: boolean }
): void {
  origin.update((old) => {
    return sub(old, toCanvasVector(delta))
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
  zoom(toCanvasPosition(p), delta.y < 0 ? 1 / ZOOM_RATE : ZOOM_RATE)
}
