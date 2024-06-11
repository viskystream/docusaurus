import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  ColumnFiltersState,
  SortingState,
  Updater,
  VisibilityState,
} from '@tanstack/react-table';
import { RootState } from '../../services';

export interface DataGridState {
  columnFilters: ColumnFiltersState;
  globalFilter: string;
  sorting: SortingState;
  columnVisibility: VisibilityState;
}

const initialState: DataGridState = {
  globalFilter: '',
  columnFilters: [],
  sorting: [],
  columnVisibility: {},
};

export const docsSlice = createSlice({
  name: '@shared/data-grid',
  initialState,
  reducers: {
    setGlobalFilter: (state, action: PayloadAction<string>) => {
      state.globalFilter = action.payload;
    },
    setColumnFilters: (
      state,
      action: PayloadAction<Updater<ColumnFiltersState>>,
    ) => {
      const { payload } = action;
      if (typeof payload === 'function') {
        state.columnFilters = payload(state.columnFilters);
      } else {
        state.columnFilters = payload;
      }
    },
    setColumnVisibility: (
      state,
      action: PayloadAction<Updater<VisibilityState>>,
    ) => {
      const { payload } = action;
      if (typeof payload === 'function') {
        state.columnVisibility = payload(state.columnVisibility);
      } else {
        state.columnVisibility = payload;
      }
    },
    setSorting: (state, action: PayloadAction<Updater<SortingState>>) => {
      const { payload } = action;
      if (typeof payload === 'function') {
        state.sorting = payload(state.sorting);
      } else {
        state.sorting = payload;
      }
    },
    reset: () => initialState,
  },
});

const { name, reducer, actions } = docsSlice;
const {
  setColumnFilters, setColumnVisibility, setGlobalFilter, setSorting, reset,
} = actions;
export {
  setColumnFilters, setColumnVisibility, setGlobalFilter, setSorting, reset,
};

export const getDataGridSlice = (state: RootState) => state[name];

const dataGridSlice = {
  reducerPath: name,
  reducer,
};

export default dataGridSlice;
