<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import type { ElementBase } from '../../models/entities'
  import { getElementAnchor, getElementBoundBox } from '../../models/elements'
  import ElementAnchor from './ElementAnchor.svelte'
  import BoundingBox from './BoundingBox.svelte'
  import type { ElementBoundingBox } from '../../models/elements/core'

  export let elements: ElementBase[] = []
  export let selectedElementIds: { [id: string]: true } = {}

  $: elementInfos = elements.map((elm) => ({
    elm,
    anchor: getElementAnchor(elm),
  }))

  const dispatch = createEventDispatcher()

  function selectElement(id: string): void {
    dispatch('selectElement', id)
  }

  function getBoundBox(elm: ElementBase): ElementBoundingBox {
    return getElementBoundBox(elm)
  }
</script>

<g>
  {#each elementInfos as info}
    <g on:click={() => selectElement(info.elm.id)}>
      <ElementAnchor
        x={info.anchor.x}
        y={info.anchor.y}
        selected={selectedElementIds[info.elm.id]}
      />
      {#if selectedElementIds[info.elm.id]}
        <BoundingBox {...getBoundBox(info.elm)} />
      {/if}
    </g>
  {/each}
</g>
