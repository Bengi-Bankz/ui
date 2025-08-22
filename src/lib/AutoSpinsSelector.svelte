<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let options: string[] = ["10", "20", "50", "100", "∞"];
    export let initial: string = "10";
    let selected = initial;
    const dispatch = createEventDispatcher();

    function select(option: string) {
        selected = option;
        dispatch("change", option);
    }
</script>

<div class="auto-spins-selector">
    {#each options as option}
        <button
            class:selected={option === selected}
            on:click={() => select(option)}
            aria-pressed={option === selected}
        >
            {option}
        </button>
    {/each}
</div>

<style>
    .auto-spins-selector {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        margin: 0.5rem 0;
    }
    .auto-spins-selector button {
        background: #fff;
        border: 2px solid #ccc;
        border-radius: 8px;
        padding: 0.5em 1.2em;
        font-size: 1.1rem;
        cursor: pointer;
        transition:
            border 0.2s,
            background 0.2s;
    }
    .auto-spins-selector button.selected {
        border: 2px solid #00aeef;
        background: #e6f7ff;
        font-weight: bold;
    }
    .auto-spins-selector button:focus {
        outline: none;
        border-color: #4169e1;
    }
</style>
