import { useSelector } from 'react-redux';

export function useAuth() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  return {
    user,
    isLoggedIn: Boolean(token),
    token,
  };
}