import axios from 'axios';

import { env } from '../config/env.js';

export const api = axios.create({
  baseURL: env.apiBaseUrl,
});

api.interceptors.request.use(config => {
  const nextConfig = { ...config };

  if (!nextConfig.headers) {
    nextConfig.headers = {};
  }

  return nextConfig;
});

export const setAuthHeader = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete api.defaults.headers.common.Authorization;
};
