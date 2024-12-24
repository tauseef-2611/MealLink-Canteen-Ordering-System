
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return React.createElement('nav', { className: 'navbar navbar-expand-lg navbar-light bg-white shadow-sm' },
    React.createElement('div', { className: 'container' },
      React.createElement(Link, { className: 'navbar-brand fw-bold', to: '/' }, 'MealLink'),
      
      React.createElement('div', { className: 'd-flex d-lg-none' },
        React.createElement(Link, { to: '/cart', className: 'btn btn-outline-primary position-relative me-2' },
          React.createElement(ShoppingCart, { size: 20 }),
          totalItems > 0 && React.createElement('span', { className: 'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger' }, totalItems)
        ),
        React.createElement('button', {
          className: 'navbar-toggler',
          type: 'button',
          'data-bs-toggle': 'collapse',
          'data-bs-target': '#navbarNav'
        },
          React.createElement('span', { className: 'navbar-toggler-icon' })
        )
      ),

      React.createElement('div', { className: 'collapse navbar-collapse', id: 'navbarNav' },
        React.createElement('ul', { className: 'navbar-nav me-auto' },
          React.createElement('li', { className: 'nav-item' },
            React.createElement(Link, { className: 'nav-link', to: '/' }, 'Home')
          ),
          React.createElement('li', { className: 'nav-item' },
            React.createElement(Link, { className: 'nav-link', to: '/menu' }, 'Menu')
          ),
          React.createElement('li', { className: 'nav-item' },
            React.createElement(Link, { className: 'nav-link', to: '/about' }, 'About')
            
          ),
          React.createElement('li', { className: 'nav-item' },
            React.createElement(Link, { className: 'nav-link', to: '/order-status' }, 'Orders')
          )
        ),

        React.createElement('div', { className: 'd-flex align-items-center' },
          React.createElement('span', { className: 'me-3 text-muted' }, `Welcome, ${user?.name}`),
          React.createElement(Link, {
            to: '/cart',
            className: 'btn btn-outline-primary position-relative me-2 d-none d-lg-inline-flex'
          },
            React.createElement(ShoppingCart, { size: 20 }),
            totalItems > 0 && React.createElement('span', { className: 'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger' }, totalItems)
          ),
          React.createElement('button', {
            onClick: handleLogout,
            className: 'btn btn-outline-danger'
          },
            React.createElement(LogOut, { size: 20 })
          )
        )
      )
    )
  );
}

export default Navbar;
