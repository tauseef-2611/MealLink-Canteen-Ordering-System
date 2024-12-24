import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, Coffee, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function AdminNavbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/admin">
          MealLink Admin
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#adminNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/admin')}`} to="/admin">
                <LayoutDashboard size={18} className="me-2" />
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/admin/menu')}`} to="/admin/menu">
                <Coffee size={18} className="me-2" />
                Menu Management
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/admin/orders')}`} to="/admin/orders">
                <Bell size={18} className="me-2" />
                Orders
              </Link>
            </li>
          </ul>
          
          <button 
            onClick={handleLogout}
            className="btn btn-light"
          >
            <LogOut size={20} className="me-2" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
