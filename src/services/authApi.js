// export const authApi = {
//   register: '/api/auth/register',
//   login: '/api/auth/login',
//   logout: '/api/auth/logout',
//   current: '/api/users/current',
// };

import axios from "axios";
import { setAuthHeader, clearAuthHeader } from "./api.js";

export const register = async (userData) => {
    const response = await axios.post('/api/auth/sign-up', userData);
    return response.data;
};

export const login = async (credentials) => {
    const response = await axios.post('/api/auth/sign-in', credentials);
    setAuthHeader(response.data.token);
    return response.data;
};

export const logout = async () => {
    await axios.delete('/api/auth/sign-out');
    clearAuthHeader();
};

export const fetchCurrentUser = async () => {
    const response = await axios.get('/api/users/current');
    return response.data;
};

