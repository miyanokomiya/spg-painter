<script lang="ts">
  import { getContext } from 'svelte'
  import type { Readable } from 'svelte/store'
  import { CANVAS_ANCHOR_TYPE } from '../../utils/canvas';

  export let x = 0
  export let y = 0
  export let width = 0
  export let height = 0
  export let radian = 0

  const scale = getContext<Readable<number>>('scale')

  $: transform = `translate(${x},${y})`
</script>

<g {transform}>
  <rect
    {width}
    {height}
    fill="none"
    stroke="red"
    stroke-width={$scale * 2}
    stroke-dasharray={`${$scale * 4} ${$scale * 4}`}
  />
  <ellipse
    data-anchor-type={CANVAS_ANCHOR_TYPE.ANCHOR_TRANSLATE}
    cx={width / 2}
    cy={height / 2}
    rx={8 * $scale}
    ry={8 * $scale}
    fill="red"
    stroke="none"
  />
</g>
