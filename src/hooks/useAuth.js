import { getStoredToken, getStoredUser } from '../utils/auth.js';

export function useAuth() {
  const token = getStoredToken();
  const user = getStoredUser();

  return {
    user,
    isLoggedIn: Boolean(token),
    token,
  };
}
