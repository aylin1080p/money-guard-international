import { Navigate } from 'react-router-dom';

import { ROUTES } from '../constants/routes.js';
import { useAuth } from '../hooks/useAuth.js';

function PublicRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return children;
}

export default PublicRoute;
