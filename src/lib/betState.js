
import { writable } from 'svelte/store';

export const betState = writable({
    bet: 1.0,
    autoSpinsCounter: 0,
    selectedAutoSpins: '10',
    // Add more properties as needed
});

// Usage example:
// import { betState } from './betState.js';
// $: $betState.bet
