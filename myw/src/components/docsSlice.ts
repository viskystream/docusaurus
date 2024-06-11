import { createSelector, createSlice } from '@reduxjs/toolkit';
import { injectReducer } from '../services/store';
import StoreState from '../services/storeTypes';

export interface DocsState {
    updated: number,
}

const initialState: DocsState = {
    updated: 0,
};

export const docsSlice = createSlice({
    name: 'docsSlice',
    initialState,
    reducers: {
        increment: (state) => {
            state.updated += 1;
        },
    },
});

const { name, reducer, actions } = docsSlice;
const { increment } = actions;
export { increment };

export const getSlice = (state: StoreState) => state[name];
export const getUpdated = createSelector(getSlice, (slice) => slice?.updated ?? 0);

injectReducer(name, reducer);
