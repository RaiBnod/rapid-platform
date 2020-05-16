import React from 'react';
import PropTypes from 'prop-types';

function DynamicPageMenuItem(props) {
  const { icon, text, onClick } = props;
  return (
    <div role="presentation" onClick={() => onClick()} className="dynamic-page-menu-item">
      <span className="icon" uk-icon={icon} />
      {text}
    </div>
  );
}

DynamicPageMenuItem.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DynamicPageMenuItem;
