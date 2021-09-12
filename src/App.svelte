<script lang="ts">
  import { onMount } from 'svelte'

  import GridPanelH from './components/layouts/GridPanelH.svelte'
  import ToolPanel from './components/panels/ToolPanel.svelte'
  import CanvasHandler from './components/canvases/CanvasHandler.svelte'
  import CanvasOverlay from './components/canvases/CanvasOverlay.svelte'
  import ElementAnchor from './components/canvases/ElementAnchor.svelte'
  import CanvasElementLayer from './components/canvases/CanvasElementLayer.svelte'

  import { viewSize, viewBox } from './stores/canvas'
  import { currentLayer } from './stores/layers'

  let canvasWrapperEl: HTMLElement
  let canvasEl: HTMLCanvasElement

  $: {
    const rect = canvasWrapperEl?.getBoundingClientRect()
    if (rect) {
      viewSize.set({ width: rect.width, height: rect.height })
    }
  }

  onMount(() => {
    setTimeout(() => {
      const ctx = canvasEl.getContext('2d')!
      ctx.rect(10, 20, 100, 200)
      ctx.fillStyle = 'green'
      ctx.fill()
    })
  })
</script>

<div class="app">
  {$currentLayer?.elements}
  <GridPanelH expanded rateList={[3, 7]}>
    <div slot="0"><ToolPanel /></div>
    <div slot="1" bind:this={canvasWrapperEl} class="canvas-wrapper">
      <canvas
        bind:this={canvasEl}
        width={$viewSize.width}
        height={$viewSize.height}
      />
      <div class="canvas-overlay">
        <CanvasHandler>
          <CanvasOverlay
            viewBox={$viewBox}
            width={$viewSize.width}
            height={$viewSize.height}
          >
            <CanvasElementLayer elements={$currentLayer?.elements} />
          </CanvasOverlay>
        </CanvasHandler>
      </div>
    </div>
  </GridPanelH>
</div>

<style>
  .app {
    padding: 10px;
    height: 100vh;
  }
  .canvas-wrapper {
    position: relative;
    height: 100%;
  }
  .canvas-overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
</style>
