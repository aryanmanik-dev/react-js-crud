import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigateTo = useNavigate();

  const handleLogout = () => {
    navigateTo('/');
  };

  return (
    <>
      <nav className="navbar bg-light">
        <button onClick={handleLogout} className="btn btn-primary ms-auto logout-btn">
          Logout
        </button>
      </nav>
    </>
  );
};

export default Header;
