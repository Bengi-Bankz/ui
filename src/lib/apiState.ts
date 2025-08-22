import { writable } from 'svelte/store';

export interface ApiState {
    playResponse: any;
    endRoundResponse: any;
}

export const apiState = writable<ApiState>({
    playResponse: null,
    endRoundResponse: null
});

// Usage:
// import { apiState } from './apiState';
// $apiState.playResponse, $apiState.endRoundResponse
