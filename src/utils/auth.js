import { storageKeys } from './storage.js';

const fallbackUser = {
  email: '',
};

export function getStoredToken() {
  return localStorage.getItem(storageKeys.token) ?? '';
}

export function getStoredUser() {
  const raw = localStorage.getItem(storageKeys.user);

  if (!raw) {
    return fallbackUser;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return fallbackUser;
  }
}

export function setSession({ token, user }) {
  localStorage.setItem(storageKeys.token, token);
  localStorage.setItem(storageKeys.user, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(storageKeys.token);
  localStorage.removeItem(storageKeys.user);
}
