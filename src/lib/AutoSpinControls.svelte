<script lang="ts">
    import { createEventDispatcher } from "svelte";
    export let autoSpinsCounter: number = 0;
    export let onStart: () => void;
    export let onStop: () => void;
</script>

<div class="auto-spin-controls">
    {#if autoSpinsCounter > 0 || autoSpinsCounter === Infinity}
        <button on:click={onStop} class="auto-spin-btn">Stop Auto Spins</button>
        <span class="auto-spin-counter"
            >{autoSpinsCounter === Infinity ? "∞" : autoSpinsCounter} spins left</span
        >
    {:else}
        <button on:click={onStart} class="auto-spin-btn"
            >Start Auto Spins</button
        >
    {/if}
</div>

<style>
    .auto-spin-controls {
        display: flex;
        align-items: center;
        gap: 1em;
        margin-left: 1em;
    }
    .auto-spin-btn {
        background: var(--blue1);
        color: #fff;
        border: none;
        border-radius: 1em;
        padding: 0.5em 1.2em;
        font-size: 1.1em;
        cursor: pointer;
        font-weight: bold;
        transition: background 0.2s;
    }
    .auto-spin-btn:hover {
        background: var(--blue2);
    }
    .auto-spin-counter {
        font-size: 1.1em;
        font-weight: bold;
        color: var(--blue2);
    }
</style>
