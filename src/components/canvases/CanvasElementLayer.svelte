<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import type { ElementBase } from '../../models/entities'
  import { getElementAnchor, getElementBoundBox } from '../../models/elements'
  import ElementAnchor from './ElementAnchor.svelte'
  import BoundingBox from './BoundingBox.svelte'
  import type { ElementBoundingBox } from '../../models/elements/core'
  import { CANVAS_ANCHOR_TYPE, createAnchor } from '../../utils/canvas'

  export let elements: ElementBase[] = []
  export let selectedElementIds: { [id: string]: true } = {}

  $: elementInfos = elements.map((elm) => ({
    elm,
    anchor: getElementAnchor(elm),
  }))

  function getBoundBox(elm: ElementBase): ElementBoundingBox {
    return getElementBoundBox(elm)
  }
</script>

<g>
  {#each elementInfos as info}
    <g>
      <g {...createAnchor(CANVAS_ANCHOR_TYPE.ANCHOR_SELECT, info.elm.id)}>
        <ElementAnchor
          x={info.anchor.x}
          y={info.anchor.y}
          selected={selectedElementIds[info.elm.id]}
        />
      </g>
      {#if selectedElementIds[info.elm.id]}
        <BoundingBox id={info.elm.id} {...getBoundBox(info.elm)} />
      {/if}
    </g>
  {/each}
</g>
