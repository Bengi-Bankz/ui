<script lang="ts">
  import { onMount } from "svelte";

  import { Application } from "pixi.js";

  let pixiContainer: HTMLDivElement;
  let app: any = null;

  onMount(() => {
    if (!app && pixiContainer) {
      app = new Application({
        width: 320,
        height: 320,
        backgroundColor: 0xb3d8f7, // baby blue
      });
      pixiContainer.appendChild(app.view);
    }
  });
</script>

<div class="pixi-left-panel">
  <div bind:this={pixiContainer} class="pixi-canvas"></div>
</div>

<style>
  .pixi-left-panel {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    padding: 0;
    box-sizing: border-box;
  }
  .pixi-canvas {
    width: 90vw;
    max-width: 420px;
    height: 90vw;
    max-height: 420px;
    aspect-ratio: 1 / 1;
    background: #b3d8f7;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    overflow: hidden;
  }
  @media (max-width: 600px) {
    .pixi-canvas {
      width: 98vw;
      height: 98vw;
      max-width: 100vw;
      max-height: 100vw;
      border-radius: 8px;
    }
    .pixi-left-panel {
      padding: 0;
    }
  }
</style>
