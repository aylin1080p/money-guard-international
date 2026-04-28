import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Balance from '../Balance/Balance.jsx';
import Currency from '../Currency/Currency.jsx';
import Header from '../Header/Header.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import { fetchBalance } from '../../store/finance/financeOperations.js';
import './DashboardLayout.css';

function DashboardLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  return (
    <div className="dashboard-layout">
      <Header />
      <div className="dashboard-layout__container container">
        <aside className="dashboard-layout__sidebar">
          <Navigation />
          <Balance />
          <Currency />
        </aside>
        <main className="dashboard-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
