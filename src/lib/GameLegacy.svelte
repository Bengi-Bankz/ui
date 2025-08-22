<script lang="ts">
    import { onMount } from "svelte";
    import UiBar from "./UiBar.svelte";

    const API_MULTIPLIER = 1000000;
    let gamestate = $state("rest");
    let response: object | null = $state(null);
    let endRoundResponse: object | null = $state(null);
    let balance = $state(1000);
    let lastWin = $state(0);
    let bet = $state(1.0);

    function handleBetChange(e: CustomEvent<{ bet: number }>) {
        bet = e.detail.bet;
    }

    const getParam = (key: string) =>
        new URLSearchParams(window.location.search).get(key);
    async function getRGSResponse(endpoint: string, body: any): Promise<any> {
        const response = await fetch(
            `https://${getParam("rgs_url")}${endpoint}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            },
        );
        return response.json();
    }

    onMount(async () => {
        const response = await getRGSResponse("/wallet/authenticate", {
            sessionID: getParam("sessionID"),
            language: getParam("language") || "en",
        });
        balance = response.balance.amount / API_MULTIPLIER;
        console.log("loaded..");
    });

    const endRound = async () => {
        try {
            const confirmation = await getRGSResponse("/wallet/end-round", {
                sessionID: getParam("sessionID"),
            });
            if (
                confirmation &&
                confirmation.balance &&
                typeof confirmation.balance.amount === "number"
            ) {
                balance = confirmation.balance.amount / API_MULTIPLIER;
                endRoundResponse = confirmation;
                gamestate = "rest";
            } else {
                // Invalid response, reset state
                endRoundResponse = confirmation;
                gamestate = "rest";
            }
        } catch (e) {
            // Network or unexpected error
            endRoundResponse = { error: e };
            gamestate = "rest";
        }
    };

    async function getBookResponse() {
        try {
            if (gamestate == "rest") {
                if (balance < bet) {
                    alert(
                        "Insufficient balance. Please deposit or try a lower bet.",
                    );
                    // Optionally refresh wallet here if needed
                    return;
                }
                balance -= bet;
                if (balance < 0) balance = 0;
            }
            const resp = await getRGSResponse("/wallet/play", {
                mode: getParam("mode") ?? "BASE",
                currency: getParam("currency"),
                sessionID: getParam("sessionID"),
                amount: bet * API_MULTIPLIER,
            });
            endRoundResponse = null;
            response = resp;
            if (
                resp &&
                resp.round &&
                typeof resp.round.payoutMultiplier === "number"
            ) {
                lastWin = resp.round.payoutMultiplier;
                gamestate = "playing";
            } else if (
                resp &&
                resp.error === "ERR_VAL" &&
                resp.message &&
                resp.message.includes("active bet")
            ) {
                // If player has active bet, auto-call endRound
                await endRound();
            } else {
                // Invalid response, reset state
                gamestate = "rest";
                lastWin = 0;
            }
            console.log(lastWin);
            if (resp && resp.round) {
                console.log(resp.round.state);
            }
        } catch (e) {
            // Network or unexpected error
            response = { error: e };
            gamestate = "rest";
            lastWin = 0;
        }
    }
</script>

<div class="game-wrapper">
    <div class="balance-display">{Math.max(0, balance).toFixed(2)}</div>
    <div class="game-content">
        <h2>Round Win: ${lastWin}</h2>
    </div>

    <UiBar
        {gamestate}
        {bet}
        onBetChange={handleBetChange}
        onAction={gamestate === "rest" ? getBookResponse : endRound}
    />

    <div class="json-stack">
        <h3>play/ response</h3>
        <div class="bet-display">
            <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>

        <h3>end-round/ response</h3>
        <div class="end-display">
            <pre>{JSON.stringify(endRoundResponse, null, 2)}</pre>
        </div>
    </div>
</div>

<style>
    :root {
        --blue1: #00aeef;
        --blue2: #4169e1;
    }
    .balance-display {
        position: fixed;
        top: 18px;
        left: 18px;
        background: rgba(255, 255, 255, 0.92);
        color: #222;
        font-size: 1.5rem;
        font-weight: 700;
        border-radius: 12px;
        padding: 0.35em 1.1em;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        z-index: 1200;
        letter-spacing: 0.02em;
        min-width: 80px;
        text-align: left;
        border: 1.5px solid var(--blue1);
    }
    @media (max-width: 600px) {
        .balance-display {
            font-size: 1.1rem;
            padding: 0.25em 0.7em;
            top: 10px;
            left: 10px;
            min-width: 60px;
        }
    }
    @media (max-width: 400px) {
        .balance-display {
            font-size: 0.95rem;
            padding: 0.18em 0.5em;
            top: 6px;
            left: 6px;
            min-width: 40px;
        }
    }
</style>
