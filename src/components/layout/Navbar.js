// src/components/layout/Navbar.js


import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: '#3a8c4a',
      color: 'white',
      padding: '10px 20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div>
          <Link to="/" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            Library System
          </Link>
        </div>
        
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '20px' }}>
              <Link
                to="/"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  marginRight: '15px',
                  fontWeight: location.pathname === '/' ? 'bold' : 'normal'
                }}
              >
                Books
              </Link>
              <Link
                to="/borrowed"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: location.pathname === '/borrowed' ? 'bold' : 'normal'
                }}
              >
                My Borrowed Books
              </Link>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px' }}>
                Hello, {user.name}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid white',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div>
            <Link
              to="/login"
              style={{
                color: 'white',
                textDecoration: 'none',
                marginRight: '15px'
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                color: 'white',
                textDecoration: 'none'
              }}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;