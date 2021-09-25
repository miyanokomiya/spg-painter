<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import type { ElementBase } from '../../models/entities'
  import { getElementAnchor } from '../../models/elements'
  import ElementAnchor from './ElementAnchor.svelte'

  export let elements: ElementBase[] = []
  export let selectedElementIds: { [id: string]: true } = {}

  $: elementInfos = elements.map((elm) => ({
    id: elm.id,
    anchor: getElementAnchor(elm),
  }))

  const dispatch = createEventDispatcher()

  function selectElement(id: string): void {
    dispatch('selectElement', id)
  }
</script>

<g>
  {#each elementInfos as info}
    <g on:click={() => selectElement(info.id)}>
      <ElementAnchor
        x={info.anchor.x}
        y={info.anchor.y}
        selected={selectedElementIds[info.id]}
      />
    </g>
  {/each}
</g>
