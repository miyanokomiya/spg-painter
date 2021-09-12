<script>
  import { useDrag, getPointInTarget } from 'okanvas'
  import { downAt, moveBy } from '../../stores/canvas'
  import { sub } from 'okageo'

  const drag = useDrag((arg) => {
    moveBy.update(() => sub(arg.p, arg.base))
  })

  function onDown(e) {
    downAt.update(() => getPointInTarget(e))
    drag.onDown(e)
  }
  function onMove(e) {
    drag.onMove(e)
  }
  function onUp() {
    moveBy.update(() => ({ x: 0, y: 0 }))
    drag.onUp()
  }
</script>

<div
  class="wrapper"
  on:pointerdown={onDown}
  on:pointermove={onMove}
  on:pointerup={onUp}
>
  <slot />
  <div
    class="pointer from"
    style="transform: translate({$downAt.x}px, {$downAt.y}px)"
  />
  <div
    class="pointer to"
    style="transform: translate({$downAt.x + $moveBy.x}px, {$downAt.y +
      $moveBy.y}px)"
  />
</div>

<style lang="scss">
  .wrapper {
    position: relative;
  }
  .pointer {
    position: absolute;
    top: -5px;
    left: -5px;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    pointer-events: none;

    &.from {
      background-color: red;
    }
    &.to {
      background-color: blue;
    }
  }
</style>
