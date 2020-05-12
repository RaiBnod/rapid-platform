import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';

function Header() {
  return (
    <div className="header-wrapper">
      <div className="header" style={{ float: 'left' }}>
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
        </Link>
        <h1>Documentation</h1>
      </div>
    </div>
  );
}

export default Header;
