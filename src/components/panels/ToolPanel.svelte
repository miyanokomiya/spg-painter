<script lang="ts">
  import { addElement } from '../../stores/layers'

  import ToolButton from '../atoms/ToolButton.svelte'

  function onClickRect() {
    console.log('add rect')
    addElement(
      'rect',
      {},
      () => `rect_${Math.random()}`
    )
  }
</script>

<div class="wrapper">
  <ToolButton on:click={onClickRect}>Rect</ToolButton>
  <ToolButton>Circle</ToolButton>
  <ToolButton>Line</ToolButton>
  <ToolButton>Line</ToolButton>
  <ToolButton>Line</ToolButton>
  <ToolButton>Line</ToolButton>
  <ToolButton>Line</ToolButton>
  <ToolButton>Line</ToolButton>
  <ToolButton>Line</ToolButton>
</div>

<style>
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
</style>
