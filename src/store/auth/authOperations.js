import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api.js';
import { setSession, clearSession } from '../../utils/auth.js';

export const authInitialState = {
    user: null,
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
};

export const registerUser = createAsyncThunk(
    'auth/register',
    async (credentials, thunkAPI) => {
        try {
            const response = await api.post('/api/auth/sign-up', credentials);
            const { token, user } = response.data;
            setSession({ token, user });
            return { token, user };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const response = await api.post('/api/auth/sign-in', credentials);
            const { token, user } = response.data;
            setSession({ token, user });
            return { token, user };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await api.delete('/api/auth/sign-out');
            clearSession();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/api/users/current');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);