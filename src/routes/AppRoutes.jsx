import { Navigate, Route, Routes } from 'react-router-dom';

import DashboardLayout from '../components/DashboardLayout/DashboardLayout.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import PublicRoute from './PublicRoute.jsx';
import CurrencyTab from '../pages/CurrencyTab.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import DashboardWelcome from '../pages/DashboardWelcome.jsx';
import HomeTab from '../pages/HomeTab.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegistrationPage from '../pages/RegistrationPage.jsx';
import StatisticsTab from '../pages/StatisticsTab.jsx';
import { ROUTES } from '../constants/routes.js';

function AppRoutes() {
  return (
    <Routes>
      <Route
        path={ROUTES.REGISTER}
        element={
          <PublicRoute>
            <RegistrationPage />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      >
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardWelcome />} />
          <Route path={ROUTES.HOME.slice(1)} element={<HomeTab />} />
          <Route path={ROUTES.STATISTICS.slice(1)} element={<StatisticsTab />} />
          <Route path={ROUTES.CURRENCY.slice(1)} element={<CurrencyTab />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  );
}

export default AppRoutes;
