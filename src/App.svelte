<script lang="ts">
  import GridPanelH from './components/layouts/GridPanelH.svelte'
  import ToolPanel from './components/panels/ToolPanel.svelte'
  import HistoryPanel from './components/panels/HistoryPanel.svelte'
  import CanvasOverlay from './components/canvases/CanvasOverlay.svelte'
  import CanvasElementLayer from './components/canvases/CanvasElementLayer.svelte'

  import { viewSize, viewBox } from './stores/canvas'
  import {
    lastSelectedLayerElements,
    init,
    selectElement,
    selectedElementIds,
  } from './stores/layers'
  import { undo, redo } from './stores/history'

  let canvasWrapperEl: HTMLElement
  let canvasEl: HTMLCanvasElement

  init()

  $: {
    const rect = canvasWrapperEl?.getBoundingClientRect()
    if (rect) {
      viewSize.set({ width: rect.width, height: rect.height })
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!e.ctrlKey) return

    switch (e.key) {
      case 'z':
        undo()
        return
      case 'Z':
        redo()
        return
    }
  }

  function onSelectElement(e: CustomEvent<string>) {
    console.log(e.detail)
    selectElement(e.detail)
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="app">
  <GridPanelH expanded rateList={[3, 7]}>
    <div slot="0"><ToolPanel /></div>
    <div slot="1" bind:this={canvasWrapperEl} class="canvas-wrapper">
      <canvas
        bind:this={canvasEl}
        width={$viewSize.width}
        height={$viewSize.height}
      />
      <div class="canvas-overlay">
        <CanvasOverlay
          viewBox={$viewBox}
          width={$viewSize.width}
          height={$viewSize.height}
        >
          <CanvasElementLayer
            elements={$lastSelectedLayerElements}
            selectedElementIds={$selectedElementIds}
            on:selectElement={onSelectElement}
          />
        </CanvasOverlay>
      </div>
      <div class="history-panel">
        <HistoryPanel />
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
  .history-panel {
    position: absolute;
    right: 0;
    bottom: 0;
    max-height: 100%;
    overflow: auto;
    opacity: 0.6;
  }
</style>
