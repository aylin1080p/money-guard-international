import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { selectIsLoggedIn, selectIsRefreshing } from '../store/auth/authSelectors.js';
import { fetchDashboardData } from '../store/global/globalSlice.js';

function DashboardPage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    if (isLoggedIn && !isRefreshing) {
      dispatch(fetchDashboardData());
    }
  }, [dispatch, isLoggedIn, isRefreshing]);

  return <Outlet />;
}

export default DashboardPage;
