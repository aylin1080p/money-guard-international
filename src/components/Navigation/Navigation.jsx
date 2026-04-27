import { NavLink } from 'react-router-dom';

import { ROUTES } from '../../constants/routes.js';
import Icon from '../Icon/Icon.jsx';
import './Navigation.css';

const buildNavClassName = ({ isActive }) =>
  `navigation__link${isActive ? ' navigation__link--active' : ''}`;

function Navigation() {
  return (
    <nav className="navigation">
      <NavLink className={buildNavClassName} to={`${ROUTES.DASHBOARD}${ROUTES.HOME}`}>
        <Icon className="navigation__icon" name="home" width={18} height={18} />
        <span>Home</span>
      </NavLink>
      <NavLink
        className={buildNavClassName}
        to={`${ROUTES.DASHBOARD}${ROUTES.STATISTICS}`}
      >
        <Icon className="navigation__icon" name="statistics" width={18} height={18} />
        <span>Statistics</span>
      </NavLink>
      <NavLink className={buildNavClassName} to={`${ROUTES.DASHBOARD}${ROUTES.CURRENCY}`}>
        <Icon className="navigation__icon" name="currency" width={18} height={18} />
        <span>Currency</span>
      </NavLink>
    </nav>
  );
}

export default Navigation;
