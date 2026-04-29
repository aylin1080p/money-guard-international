import { createSlice } from '@reduxjs/toolkit';

import {
  fetchCategories,
  fetchCurrency,
  fetchTransactions,
} from './financeOperations.js';

const getAmount = transaction =>
  Number(transaction?.amount ?? transaction?.transactionAmount ?? 0);

const isIncome = transaction => {
  const type = String(transaction?.type ?? transaction?.transactionType ?? '').toUpperCase();
  return type === 'INCOME' || type === '+';
};

const calculateTotalBalance = transactions =>
  transactions.reduce((total, t) => total + getAmount(t), 0);

const financeSlice = createSlice({
  name: 'finance',
  initialState: {
    transactions: [],
    totalBalance: 0,
    categoriesSummary: [],
    currency: [],
    categories: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.totalBalance = calculateTotalBalance(action.payload);
      })
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.currency = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const financeReducer = financeSlice.reducer;
