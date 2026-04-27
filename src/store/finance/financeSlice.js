import { createSlice } from '@reduxjs/toolkit';

import { fetchCurrency, fetchTransactions } from './financeOperations.js';

export const financeInitialState = {
  transactions: [],
  totalBalance: 0,
  categoriesSummary: [],
  currency: [],
};

const getAmount = transaction =>
  Number(transaction?.amount ?? transaction?.transactionAmount ?? 0);

const isIncome = transaction => {
  const type = String(transaction?.type ?? transaction?.transactionType ?? '').toUpperCase();
  return type === 'INCOME' || type === '+';
};

const calculateTotalBalance = transactions =>
  transactions.reduce((total, transaction) => {
    const amount = getAmount(transaction);
    return isIncome(transaction) ? total + amount : total - amount;
  }, 0);

const financeSlice = createSlice({
  name: 'finance',
  initialState: financeInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.totalBalance = calculateTotalBalance(action.payload);
      })
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.currency = action.payload;
      });
  },
});

export const financeReducer = financeSlice.reducer;
