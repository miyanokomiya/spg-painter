import { derived, writable } from 'svelte/store'
import type { IVec2 } from 'okageo'

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
