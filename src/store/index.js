import { configureStore } from '@reduxjs/toolkit';
import { financeReducer } from './finance/financeSlice.js';
import { globalReducer } from './global/globalSlice.js';
import { authReducer } from './auth/authSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    finance: financeReducer,
    global: globalReducer,
  },
});