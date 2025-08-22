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
  align-items: flex-start;
  justify-content: flex-start;
  height: 100vh;
  padding: 24px;
}
.pixi-canvas {
  width: 320px;
  height: 320px;
  background: #b3d8f7;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  overflow: hidden;
}
</style>
