import { Navigate, useLocation } from 'react-router-dom';
import { env } from '../config/env.js'; // remove later

import { ROUTES } from '../constants/routes.js';
import { useAuth } from '../hooks/useAuth.js';

function PrivateRoute({ children }) {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  if (!env.bypassAuth && !isLoggedIn) { //remove !env.bypassAuth &&
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  return children;
}

export default PrivateRoute;
