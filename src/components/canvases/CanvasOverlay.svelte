<script lang="ts">
  import { sub } from 'okageo'

  import { getPointInTarget } from 'okanvas'
  import { onDown, onMove, onUp, onWheel } from '../../stores/canvas'

  export let viewBox = '0 0 100 100'
  export let width = 0
  export let height = 0

  let moveAt = { x: 0, y: 0 }

  function onPointerDown(e: PointerEvent) {
    onDown(getPointInTarget(e))
    console.log((e.target as HTMLElement).dataset.anchorType)
  }
  function onPointerMove(e: PointerEvent) {
    const p = getPointInTarget(e)
    onMove(p, sub(p, moveAt))
    moveAt = p
  }
  function onPointerUp() {
    onUp()
  }
  function onPointerWheel(e: WheelEvent) {
    onWheel(getPointInTarget(e), {
      x: e.deltaX,
      y: e.deltaY,
    })
  }
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="none"
  font-family="sans-serif"
  {viewBox}
  {width}
  {height}
  data-anchor-type="canvas"
  on:pointerdown={onPointerDown}
  on:pointermove={onPointerMove}
  on:pointerup={onPointerUp}
  on:wheel={onPointerWheel}
>
  <slot />
</svg>
