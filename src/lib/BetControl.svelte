<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();

    // Bet steps as described
    const betSteps = [
        ...Array.from(
            { length: 20 },
            (_, i) => +(0.1 + i * 0.1).toFixed(2),
        ).filter((x) => x <= 2),
        2.5,
        3,
        3.5,
        4,
        4.5,
        5,
        7.5,
        10,
        15,
        20,
        25,
        50,
        75,
        100,
        150,
        200,
        250,
        375,
        500,
        750,
        1000,
    ];

    let showSelector = false;
    let bet = 1.0;
    let betIndex = betSteps.indexOf(bet);

    function setBetByIndex(idx: number) {
        betIndex = Math.max(0, Math.min(betSteps.length - 1, idx));
        bet = betSteps[betIndex];
        dispatch("change", { bet });
    }

    function increment() {
        setBetByIndex(betIndex + 1);
    }
    function decrement() {
        setBetByIndex(betIndex - 1);
    }
    function selectBet(idx: number) {
        setBetByIndex(idx);
        showSelector = false;
    }
    // Keep betIndex in sync if bet is changed from outside
    export let value: number = 1.0;
    $: if (value !== bet) {
        bet = value;
        betIndex = betSteps.indexOf(bet);
    }
</script>

<div class="bet-control-bar">
    <button class="bet-step-btn" on:click={decrement} aria-label="Decrease bet"
        >-</button
    >
    <button
        class="bet-display-btn"
        on:click={() => (showSelector = !showSelector)}
        aria-label="Select bet"
    >
        ${bet.toFixed(2)}
    </button>
    <button class="bet-step-btn" on:click={increment} aria-label="Increase bet"
        >+</button
    >
</div>

{#if showSelector}
    <div
        class="bet-selector-modal"
        role="button"
        tabindex="0"
        aria-label="Close bet selector"
        on:click={() => (showSelector = false)}
        on:keydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') showSelector = false;
        }}
    >
    <div class="bet-selector">
            {#each betSteps as step, idx}
                <button
                    class:active={idx === betIndex}
                    on:click={() => selectBet(idx)}
                >
                    ${step.toFixed(2)}
                </button>
            {/each}
        </div>
    </div>
{/if}

<style>
    .bet-control-bar {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
    }
    .bet-step-btn {
        width: 2.1em;
        height: 2.1em;
        border-radius: 50%;
        border: none;
        background: var(--blue1);
        color: #fff;
        font-size: 1.1em;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .bet-step-btn:hover {
        background: var(--blue2);
    }
    .bet-display-btn {
        min-width: 4.5em;
        font-size: 1.2em;
        font-weight: 700;
        border-radius: 1.2em;
        border: 2px solid var(--blue1);
        background: #fff;
        color: #222;
        padding: 0.4em 1.2em;
        margin: 0 0.2em;
        cursor: pointer;
        transition: border 0.2s;
    }
    .bet-display-btn:hover {
        border: 2px solid var(--blue2);
    }
    .bet-selector-modal {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.25);
        z-index: 2000;
        display: flex;
        align-items: flex-end;
        justify-content: center;
    }
    .bet-selector {
        background: #fff;
        border-radius: 18px 18px 0 0;
        padding: 1.2em 1em 1.5em 1em;
        width: 100vw;
        max-width: 420px;
        min-width: 220px;
        box-shadow: 0 -2px 24px rgba(0, 0, 0, 0.13);
        display: flex;
        flex-wrap: wrap;
        gap: 0.5em;
        justify-content: center;
        margin-bottom: 0;
    }
    .bet-selector button {
        min-width: 4em;
        font-size: 1.1em;
        border-radius: 1em;
        border: 2px solid var(--blue1);
        background: #fff;
        color: #222;
        padding: 0.3em 0.7em;
        margin: 0.1em;
        cursor: pointer;
        transition:
            border 0.2s,
            background 0.2s;
    }
    .bet-selector button.active,
    .bet-selector button:hover {
        border: 2px solid var(--blue2);
        background: var(--blue1);
        color: #fff;
    }
    @media (max-width: 600px) {
        .bet-selector {
            max-width: 98vw;
            padding: 0.7em 0.2em 1em 0.2em;
        }
        .bet-display-btn {
            font-size: 1em;
            padding: 0.3em 0.7em;
        }
        .bet-step-btn {
            width: 1.7em;
            height: 1.7em;
            font-size: 1.1em;
        }
    }
    @media (max-width: 400px) {
        .bet-step-btn {
            width: 1.3em;
            height: 1.3em;
            font-size: 0.95em;
        }
    }
</style>
