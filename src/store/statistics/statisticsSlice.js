import { createSlice } from '@reduxjs/toolkit';

import { fetchStatistics } from './statisticsOperations.js';

const now = new Date();

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState: {
    selectedMonth: now.getMonth() + 1,
    selectedYear: now.getFullYear(),
    categoriesSummary: [],
    incomeSummary: 0,
    expenseSummary: 0,
    periodTotal: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    setSelectedMonth(state, action) {
      state.selectedMonth = action.payload;
    },
    setSelectedYear(state, action) {
      state.selectedYear = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchStatistics.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        const p = action.payload;
        state.categoriesSummary = p.categoriesSummary ?? [];
        state.incomeSummary = p.incomeSummary ?? 0;
        state.expenseSummary = p.expenseSummary ?? 0;
        state.periodTotal = p.periodTotal ?? 0;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to load statistics';
      });
  },
});

export const { setSelectedMonth, setSelectedYear } = statisticsSlice.actions;
export const statisticsReducer = statisticsSlice.reducer;
