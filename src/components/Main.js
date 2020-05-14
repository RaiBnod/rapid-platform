import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Main extends Component {
  render() {
    const { page } = this.props;
    return <div className="main">{page.data}</div>;
  }
}

Main.propTypes = {
  page: PropTypes.shape({ data: PropTypes.string }).isRequired,
};

export default Main;
