import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchUsdEuroValues } from '../../services/currencyApi.js';
import * as txApi from '../../services/transactionsApi.js';

const normalizeTransactions = payload => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.transactions)) return payload.transactions;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
};

export const fetchTransactions = createAsyncThunk(
  'finance/fetchTransactions',
  async (_, thunkAPI) => {
    try {
      const data = await txApi.getTransactions();
      return normalizeTransactions(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message ?? error.message);
    }
  }
);

export const fetchCurrency = createAsyncThunk(
  'finance/fetchCurrency',
  async (_, thunkAPI) => {
    try {
      const existing = thunkAPI.getState().finance.currency;
      if (existing && existing.length > 0) return existing;
      return await fetchUsdEuroValues();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'finance/fetchCategories',
  async (_, thunkAPI) => {
    try {
      return await txApi.getCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message ?? error.message);
    }
  }
);

export const addTransactionThunk = createAsyncThunk(
  'finance/addTransaction',
  async (data, thunkAPI) => {
    try {
      const result = await txApi.addTransaction(data);
      thunkAPI.dispatch(fetchTransactions());
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message ?? error.message);
    }
  }
);

export const editTransactionThunk = createAsyncThunk(
  'finance/editTransaction',
  async ({ id, data }, thunkAPI) => {
    try {
      const result = await txApi.editTransaction(id, data);
      thunkAPI.dispatch(fetchTransactions());
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message ?? error.message);
    }
  }
);

export const deleteTransactionThunk = createAsyncThunk(
  'finance/deleteTransaction',
  async (id, thunkAPI) => {
    try {
      await txApi.deleteTransaction(id);
      thunkAPI.dispatch(fetchTransactions());
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message ?? error.message);
    }
  }
);
