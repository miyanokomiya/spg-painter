<script lang="ts">
  import { onMount } from 'svelte'

  import GridPanelH from './components/layouts/GridPanelH.svelte'
  import ToolPanel from './components/panels/ToolPanel.svelte'

  let canvasEl: HTMLCanvasElement

  onMount(() => {
    const ctx = canvasEl.getContext('2d')!
    ctx.rect(10, 20, 100, 200)
    ctx.fillStyle = 'green'
    ctx.fill()
  })
</script>

<div class="app">
  <GridPanelH expanded rateList={[3, 7]}>
    <div slot="0"><ToolPanel /></div>
    <div slot="1" class="canvas-wrapper">
      <canvas bind:this={canvasEl} />
    </div>
  </GridPanelH>
</div>

<style>
  .app {
    padding: 10px;
    height: 100vh;
  }
  .canvas-wrapper {
    height: 100%;
  }
</style>
