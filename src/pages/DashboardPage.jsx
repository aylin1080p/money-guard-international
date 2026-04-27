import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import { fetchDashboardData } from "../store/global/globalSlice";

function DashboardPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

export default DashboardPage;
