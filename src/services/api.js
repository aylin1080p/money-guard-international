import axios from 'axios';
import { env } from '../config/env.js';
import { getStoredToken } from '../utils/auth.js';

export const api = axios.create({
  baseURL: env.apiBaseUrl,
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});