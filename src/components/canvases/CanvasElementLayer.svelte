<script lang="ts">
  import type { ElementBase } from '../../models/entities'
  import { getElementAnchor } from '../../models/elements'
  import ElementAnchor from './ElementAnchor.svelte'

  export let elements: ElementBase[] = []

  $: anchors = elements.map((elm) => getElementAnchor(elm))
</script>

<g>
  {#each anchors as anchor}
    <ElementAnchor x={anchor.x} y={anchor.y} />
  {/each}
</g>
