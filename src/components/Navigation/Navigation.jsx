import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import './Navigation.css';

const buildNavClassName = ({ isActive }) =>
  `navigation__link${isActive ? ' navigation__link--active' : ''}`;

const buildSpanClassName = ({ isActive }) =>
  `navspan${isActive ? ' navigation__link--active' : ''}`;

export default function Navigation() {
  return (
    <nav className={navigation}>
      <NavLink className={buildNavClassName} to={`${ROUTES.DASHBOARD}${ROUTES.HOME}`}>
        <svg className={navigation-icon}>
          <use href="../../assets/icons/navigation-icons.svg#navlink-home"></use>
        </svg>
        <span className={buildSpanClassName}>Home</span>
      </NavLink>

      <NavLink className={buildNavClassName} to={`${ROUTES.DASHBOARD}${ROUTES.STATISTICS}`}>
        <svg class={navigation-icon}>
          <use href="../../assets/icons/navigation-icons.svg#navlink-statistics"></use>
        </svg>
        <span className={buildSpanClassName}>Statistics</span>
      </NavLink>

      <NavLink className={buildNavClassName} to={`${ROUTES.DASHBOARD}${ROUTES.CURRENCY}`}>
        <svg class={navigation-icon}>
          <use href="../../assets/icons/navigation-icons.svg#navlink-currency"></use>
        </svg>
        <span className={buildSpanClassName}>Currency</span>
      </NavLink>
    </nav>
  );
};
