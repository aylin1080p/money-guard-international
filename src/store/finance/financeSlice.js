import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
  fetchCurrency,
  fetchCategories,
  financeInitialState,
  fetchBalance,
} from './financeOperations.js';

const financeSlice = createSlice({
  name: 'finance',
  initialState: financeInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchTransactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload;
        state.transactions = Array.isArray(data) ? data : data.transactions ?? [];
        if (Array.isArray(data) && data.length > 0) {
          state.totalBalance = data[0].balanceAfter ?? state.totalBalance;
        }
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addTransaction
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.unshift(action.payload);
      })

      // editTransaction
      .addCase(editTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
        state.totalBalance = action.payload.balanceAfter ?? state.totalBalance;
      })

      // deleteTransaction
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload.id
        );
      })

      // fetchCurrency
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.currency = action.payload;
      })

      // fetchCategories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.totalBalance = action.payload;
      });
  },
});

export const financeReducer = financeSlice.reducer;