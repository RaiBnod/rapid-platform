import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header-wrapper">
      <div className="custom-header">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="logo" />
        </Link>
        <span className="title">Documentation</span>
      </div>
    </div>
  );
}

export default Header;
