<script lang="ts">
  import { sub } from 'okageo'

  import { getPointInTarget } from 'okanvas'
  import { setContext } from 'svelte'
  import { scale, onDown, onMove, onUp, onWheel } from '../../stores/canvas'
  import { CANVAS_ANCHOR_TYPE, getAnchor } from '../../utils/canvas'

  export let viewBox = '0 0 100 100'
  export let width = 0
  export let height = 0

  setContext('scale', scale)

  let moveAt = { x: 0, y: 0 }

  function onPointerDown(e: PointerEvent) {
    onDown(getPointInTarget(e), {
      anchor: getAnchor(e.target as HTMLElement),
      ctrl: e.ctrlKey,
    })
  }
  function onPointerMove(e: PointerEvent) {
    const p = getPointInTarget(e)
    onMove(p, sub(p, moveAt), { ctrl: e.ctrlKey })
    moveAt = p
  }
  function onPointerUp(e: PointerEvent) {
    onUp({ ctrl: e.ctrlKey })
  }
  function onPointerWheel(e: WheelEvent) {
    onWheel(
      getPointInTarget(e),
      { x: e.deltaX, y: e.deltaY },
      { ctrl: e.ctrlKey }
    )
  }
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="none"
  font-family="sans-serif"
  {viewBox}
  {width}
  {height}
  data-anchor-type={CANVAS_ANCHOR_TYPE.CANVAS}
  on:pointerdown={onPointerDown}
  on:pointermove={onPointerMove}
  on:pointerup={onPointerUp}
  on:wheel={onPointerWheel}
>
  <slot />
</svg>
