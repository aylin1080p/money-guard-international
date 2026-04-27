import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import css from './Navigation.module.css'
import icons from '../../assets/icons/navigation-icons.svg'

const buildNavClassName = ({ isActive }) =>
  `navigation__link${isActive ? 'navigation__link--active' : ''}`;

// const buildSpanClassName = ({ isActive }) =>
//   `navspan${isActive ? 'navspan--active' : ''}`;

export default function Navigation() {
  return (
    <nav className={css.navigation}>
      <NavLink className={buildNavClassName} to={`${ROUTES.DASHBOARD}${ROUTES.HOME}`}>
        <svg className={css.navicon}>
          <use href={`${icons}#navlink-home`}></use>
        </svg>
        <span className={css.navspan}>Home</span>
      </NavLink>

      <NavLink className={buildNavClassName} to={`${ROUTES.DASHBOARD}${ROUTES.STATISTICS}`}>
        <svg className={css.navicon}>
          <use href="../../assets/icons/navigation-icons.svg#navlink-statistics"></use>
        </svg>
        <span className={css.navspan}>Statistics</span>
      </NavLink>

      <NavLink className={buildNavClassName} to={`${ROUTES.DASHBOARD}${ROUTES.CURRENCY}`}>
        <svg className={css.navicon}>
          <use href="../../assets/icons/navigation-icons.svg#navlink-currency"></use>
        </svg>
        <span className={css.navspan}>Currency</span>
      </NavLink>
    </nav>
  );
};
