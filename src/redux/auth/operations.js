import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "https://wallet.b.goit.study";
axios.defaults.baseURL = API_BASE_URL;

// Utility to add JWT
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const signup = createAsyncThunk("auth/signup", async (credentials, thunkAPI) => {
    try {
        const response = await axios.post("/api/auth/sign-up", credentials);
        setAuthHeader(response.data.token);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const signin = createAsyncThunk("auth/signin", async (credentials, thunkAPI) => {
    try {
        const response = await axios.post("/api/auth/sign-in", credentials);
        setAuthHeader(response.data.token);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const signout = createAsyncThunk("auth/signout", async (_, thunkAPI) => {
    try {
        await axios.delete("/api/auth/sign-out");
        clearAuthHeader();
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const refreshUser = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
        return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
        setAuthHeader(persistedToken);
        const response = await axios.get("/api/users/current");
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});