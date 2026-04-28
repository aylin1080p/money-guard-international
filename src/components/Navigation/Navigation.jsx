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
        <Icon className="navicon" name="home" />
        <span className="navspan">Home</span>
      </NavLink>
      <NavLink className={buildNavClassName} to={`${ROUTES.DASHBOARD}${ROUTES.STATISTICS}`}>
        <Icon className="navicon" name="statistics" />
        <span className="navspan">Statistics</span>
      </NavLink>
      <NavLink className={buildNavClassName} to={`${ROUTES.DASHBOARD}${ROUTES.CURRENCY}`}>
        <Icon className="navicon" name="currency" />
        <span className="navspan">Currency</span>
      </NavLink>
    </nav>
  );
}

export default Navigation;
