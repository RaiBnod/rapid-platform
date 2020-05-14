import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Loading extends PureComponent {
  render() {
    const { loading } = this.props;
    return loading && <div className="spinner">{loading && <span uk-spinner="ratio: 4.5" />}</div>;
  }
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ loading }) => {
  return { loading: loading.loading };
};

export default connect(mapStateToProps, null)(Loading);
