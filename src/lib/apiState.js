import { writable } from 'svelte/store';

/**
 * playResponse and endRoundResponse can be any type (object, null, error, etc.)
 */
export const apiState = writable({
    playResponse: null,
    endRoundResponse: null
});

// Usage:
// import { apiState } from './apiState.js';
// $apiState.playResponse, $apiState.endRoundResponse
