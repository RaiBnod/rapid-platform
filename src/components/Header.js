import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setActiveNav } from '../redux';

function Header(props) {
  return (
    <div className="header-wrapper">
      <div className="custom-header">
        <Link to="/" className="logo" onClick={() => props.setActiveNav('')}>
          <img src="/logo.png" alt="logo" />
        </Link>
        <span className="title">Documentation</span>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveNav: (payload) => dispatch(setActiveNav(payload)),
  };
};

export default connect(null, mapDispatchToProps)(Header);
