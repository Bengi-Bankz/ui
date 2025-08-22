<script lang="ts">
    import BetControl from "./BetControl.svelte";
    import MenuModal from "./MenuModal.svelte";
    export let onAction: () => void;
    export let gamestate: string;
    export let bet: number = 1.0;
    export let onBetChange: (
        e: CustomEvent<{ bet: number }>,
    ) => void = () => {};
    let menuOpen = false; // Merged menuOpen state
</script>

<div class="ui-bar">
    <button class="menu-btn" aria-label="Open menu" on:click={() => menuOpen = true}>
        <!-- Hamburger Icon -->
        <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="5" y="8" width="18" height="2.5" rx="1.2" fill="#fff" />
            <rect x="5" y="13" width="18" height="2.5" rx="1.2" fill="#fff" />
            <rect x="5" y="18" width="18" height="2.5" rx="1.2" fill="#fff" />
        </svg>
    </button>
    <div
        class="bet-control-wrapper"
        role="group"
        aria-label="Bet amount controls"
    >
        <BetControl value={bet} on:change={onBetChange} />
    </div>
    <button
        class="corner-action-btn"
        on:click={onAction}
        aria-label={gamestate === "rest" ? "Place Bet" : "End Round"}
    >
        <!-- Always show Play/Spin Icon (SVG) -->
        <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="14"
                cy="14"
                r="13"
                stroke="#222"
                stroke-width="2"
                fill="var(--blue1)"
            />
            <polygon points="11,8 21,14 11,20" fill="#222" />
        </svg>
    </button>
</div>

<MenuModal open={menuOpen} on:close={() => menuOpen = false} />

<slot></slot>

<style>
    .ui-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        min-height: 80px;
        background: transparent;
        border: 2px solid #fff;
        border-radius: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 24px;
        box-sizing: border-box;
        z-index: 1100;
        box-shadow: 0 -2px 16px rgba(0, 0, 0, 0.04);
    }
    .menu-btn {
        width: 64px;
        height: 64px;
        min-width: 48px;
        min-height: 48px;
        max-width: 90px;
        max-height: 90px;
        border-radius: 50%;
        background: var(--blue1);
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-right: 16px;
        margin-top: 8px;
        margin-bottom: 8px;
        transition: background 0.2s;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
        padding: 0;
    }
    .menu-btn:hover {
        background: var(--blue2);
    }
    .corner-action-btn {
        width: 64px;
        height: 64px;
        min-width: 48px;
        min-height: 48px;
        max-width: 90px;
        max-height: 90px;
        border-radius: 50%;
        margin-left: 16px;
        margin-top: 8px;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
