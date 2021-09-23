<script lang="ts">
  import { useDrag, getPointInTarget } from 'okanvas'
  import { onDown, onMove, onDrag, onUp, onWheel } from '../../stores/canvas'

  const drag = useDrag((arg) => {
    onDrag(arg.p, arg.d)
  })

  function onPointerDown(e: PointerEvent) {
    drag.onDown(e)
    onDown(getPointInTarget(e))
  }
  function onPointerMove(e: PointerEvent) {
    drag.onMove(e)
    onMove(getPointInTarget(e))
  }
  function onPointerUp() {
    drag.onUp()
    onUp()
  }
  function onPointerWheel(e: WheelEvent) {
    onWheel(getPointInTarget(e), {
      x: e.deltaX,
      y: e.deltaY,
    })
  }
</script>

<div
  class="wrapper"
  on:pointerdown={onPointerDown}
  on:pointermove={onPointerMove}
  on:pointerup={onPointerUp}
  on:wheel={onPointerWheel}
>
  <slot />
</div>

<style>
  .wrapper {
    position: relative;
  }
</style>
