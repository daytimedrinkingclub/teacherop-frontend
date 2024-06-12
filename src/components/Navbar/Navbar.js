import React from 'react';
import { useAuth } from './../../auth-provider';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="header bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex-1">
          <Link to="/">
            <img src="/Logo.svg" alt="TeacherOP Logo" className="h-8 sm:h-10" />
          </Link>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          {!user && location.pathname === '/' && (
            <Link
              to="/pricing"
              className="text-accent hover:text-primary-light text-sm sm:text-base"
            >
              Pricing
            </Link>
          )}
          {!user && (
            <Link
              to="/login"
              className="bg-accent text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-primary-light text-sm sm:text-base"
            >
              Login
            </Link>
          )}
          {user && (
            <div className="flex space-x-2 sm:space-x-4">
              <Link
                to="/dashboard/account"
                className="bg-secondary-color text-text-color px-6 py-2 rounded"
              >
                Account
              </Link>
              <button
                className="bg-accent text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-primary-light text-sm sm:text-base"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;