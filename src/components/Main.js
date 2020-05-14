import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Main extends Component {
  render() {
    const { page, loading } = this.props;
    return (
      <div className="main">
        {loading.toString()}
        <br />
        {page.data}
      </div>
    );
  }
}

Main.propTypes = {
  page: PropTypes.shape({ data: PropTypes.string }).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Main;
