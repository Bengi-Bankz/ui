<script lang="ts">
  import GameLegacy from "./lib/GameLegacy.svelte";
  import PixiPanel from "./lib/PixiPanel.svelte";
</script>

<div class="main-flex">
  <PixiPanel />
  <GameLegacy />
</div>

<style>
.main-flex {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100vh;
}
</style>
