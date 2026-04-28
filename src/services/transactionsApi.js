import { api } from './api.js';

export const transactionsApi = {
  getAll: () => api.get('/api/transactions'),
  addTransaction: (data) => api.post('/api/transactions', data),
  editTransaction: ({ id, ...data }) => api.patch(`/api/transactions/${id}`, data),
  deleteTransaction: (id) => api.delete(`/api/transactions/${id}`),
  getCategories: () => api.get('/api/transaction-categories'),
  getSummary: () => api.get('/api/transactions-summary'),
};