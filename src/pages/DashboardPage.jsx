import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { fetchDashboardData } from '../store/global/globalSlice.js';

function DashboardPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  return <Outlet />;
}

export default DashboardPage;
