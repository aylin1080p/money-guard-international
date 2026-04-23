import { NavLink } from 'react-router-dom';

import { ROUTES } from '../../constants/routes.js';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <NavLink to={`${ROUTES.DASHBOARD}${ROUTES.HOME}`}>Home</NavLink>
      <NavLink to={`${ROUTES.DASHBOARD}${ROUTES.STATISTICS}`}>Statistics</NavLink>
      <NavLink to={`${ROUTES.DASHBOARD}${ROUTES.CURRENCY}`}>Currency</NavLink>
    </nav>
  );
}

export default Navigation;
