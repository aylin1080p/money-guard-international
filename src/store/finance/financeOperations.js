import { createAsyncThunk } from '@reduxjs/toolkit';
import { transactionsApi } from '../../services/transactionsApi.js';
import { api } from '../../services/api.js';

export const fetchTransactions = createAsyncThunk(
    'finance/fetchTransactions',
    async (_, thunkAPI) => {
        try {
            const response = await transactionsApi.getAll();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addTransaction = createAsyncThunk(
    'finance/addTransaction',
    async (payload, thunkAPI) => {
        try {
            const response = await transactionsApi.addTransaction(payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const editTransaction = createAsyncThunk(
    'finance/editTransaction',
    async (payload, thunkAPI) => {
        try {
            const response = await transactionsApi.editTransaction(payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteTransaction = createAsyncThunk(
    'finance/deleteTransaction',
    async (id, thunkAPI) => {
        try {
            await transactionsApi.deleteTransaction(id);
            const response = await transactionsApi.getAll();
            return { id, transactions: response.data, balance: response.data?.balance };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchCurrency = createAsyncThunk(
    'finance/fetchCurrency',
    async (_, thunkAPI) => {
        try {
            const response = await transactionsApi.getSummary();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const fetchBalance = createAsyncThunk(
    'finance/fetchBalance',
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/api/users/current');
            return response.data.balance;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const financeInitialState = {
    transactions: [],
    totalBalance: 0,
    categoriesSummary: [],
    currency: [],
    categories: [],
};
export const fetchCategories = createAsyncThunk(
    'finance/fetchCategories',
    async (_, thunkAPI) => {
        try {
            const response = await transactionsApi.getCategories();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);