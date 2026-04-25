import { env } from '../config/env.js';
import axios from "axios";

axios.defaults.baseURL = env.apiBaseUrl;

// Utility to add JWT
export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};
