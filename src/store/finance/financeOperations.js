import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../services/api.js';
import { transactionsApi } from '../../services/transactionsApi.js';

const normalizeTransactions = payload => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.transactions)) {
    return payload.transactions;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  return [];
};

export const fetchTransactions = createAsyncThunk(
  'finance/fetchTransactions',
  async (_, thunkAPI) => {
    try {
      const response = await api.get(transactionsApi.all);
      return normalizeTransactions(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCurrency = createAsyncThunk('finance/fetchCurrency', async () => []);

export const addTransaction = async payload => payload;
export const editTransaction = async payload => payload;
export const deleteTransaction = async id => id;
