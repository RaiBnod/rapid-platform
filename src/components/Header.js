import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';

function Header() {
  return (
    <div className="header-wrapper">
      <div className="custom-header">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
        </Link>
        <span className="title">Documentation</span>
      </div>
    </div>
  );
}

export default Header;
