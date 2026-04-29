import { Link } from 'react-router-dom';

import { ROUTES } from '../../constants/routes.js';
import { useAuth } from '../../hooks/useAuth.js';
import Icon from '../Icon/Icon.jsx';
import './Logo.css';

function Logo() {
  const { isLoggedIn } = useAuth();
  const targetPath = isLoggedIn ? `${ROUTES.DASHBOARD}${ROUTES.HOME}` : ROUTES.LOGIN;

  return (
    <Link className="logo" to={targetPath}>
      <Icon className="logo__icon" name="logo" width={28} height={34} />
      <span className="logo__text">Money Guard</span>
    </Link>
  );
}

export default Logo;
