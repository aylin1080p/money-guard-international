import { setAuthHeader, clearAuthHeader } from "./api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "./authApi"

export const signup = createAsyncThunk("auth/signup", async (credentials, thunkAPI) => {
    try {
        const data = await authApi.register(credentials);
        setAuthHeader(data.token);
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const signin = createAsyncThunk("auth/signin", async (credentials, thunkAPI) => {
    try {
        const data = await authApi.login(credentials);
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const signout = createAsyncThunk("auth/signout", async (_, thunkAPI) => {
    try {
        await authApi.logout();
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const refreshUser = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
        return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
        setAuthHeader(persistedToken);
        const data = await authApi.fetchCurrentUser();
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});