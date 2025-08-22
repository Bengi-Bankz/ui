<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let open = false;

    function close() {
        dispatch("close");
    }
</script>

{#if open}
    <div
        class="menu-modal-backdrop"
        tabindex="0"
        aria-modal="true"
        role="dialog"
        aria-label="Game menu"
        on:click={close}
        on:keydown={(e) => {
            if (e.key === "Escape") close();
        }}
    >
        <div class="menu-modal" role="document">
            <header>
                <h2>Menu</h2>
            </header>
            <section class="menu-section">
                <h3>Game Info</h3>
                <slot name="game-info">Game details go here.</slot>
            </section>
            <section class="menu-section">
                <h3>Settings</h3>
                <slot name="settings">Settings controls go here.</slot>
            </section>
            <button class="exit-btn" on:click={close} aria-label="Exit menu"
                >Exit</button
            >
        </div>
    </div>
{/if}

<style>
    .menu-modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.35);
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .menu-modal {
        background: #fff;
        border-radius: 18px;
        box-shadow: 0 4px 32px rgba(0, 0, 0, 0.18);
        padding: 2em 1.5em 1.5em 1.5em;
        min-width: 320px;
        max-width: 95vw;
        min-height: 220px;
        display: flex;
        flex-direction: column;
        gap: 1.2em;
    }
    .menu-section {
        margin-bottom: 1em;
    }
    .exit-btn {
        align-self: flex-end;
        background: var(--blue1, #00aeef);
        color: #fff;
        border: none;
        border-radius: 1em;
        padding: 0.5em 1.5em;
        font-size: 1.1em;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.2s;
    }
    .exit-btn:hover {
        background: var(--blue2, #4169e1);
    }
</style>
