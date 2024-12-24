import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminNavbar from './AdminNavbar';

function AdminRoute() {
  const { user, isAdmin } = useAuth();

  if (!user || !isAdmin()) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
}

export default AdminRoute;
