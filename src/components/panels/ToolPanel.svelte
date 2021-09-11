<script lang="ts">
  import ToolButton from '../atoms/ToolButton.svelte'
</script>

<div class="wrapper">
  <ToolButton>Rect</ToolButton>
  <ToolButton>Circle</ToolButton>
  <ToolButton>Line</ToolButton>
  <ToolButton>Line</ToolButton>
  <ToolButton>Line</ToolButton>
  <ToolButton>Line</ToolButton>
  <ToolButton>Line</ToolButton>
  <ToolButton>Line</ToolButton>
  <ToolButton>Line</ToolButton>
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
</style>
