import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPage } from '../redux/page/pageActions';
import DynamicPageNav from './DynamicPageNav';

class DynamicPage extends Component {
  componentDidMount() {
    this.callFetchPage(this.props);
  }

  shouldComponentUpdate(nextProps) {
    const { location } = this.props;
    if (nextProps.location !== location) {
      this.callFetchPage(nextProps);
    }
    return true;
  }

  callFetchPage = (props) => {
    const {
      location: { pathname },
    } = props;
    const { fetchPageDispatch } = this.props;
    const paths = pathname.split('/');
    const bookId = paths[1];
    const pageId = paths[2];
    fetchPageDispatch(bookId, pageId);
  };

  render() {
    const { page } = this.props;
    return (
      <>
        <div className="main">{page.data}</div>
        <DynamicPageNav />
      </>
    );
  }
}

DynamicPage.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  page: PropTypes.shape({ data: PropTypes.string }).isRequired,
  fetchPageDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ page }) => {
  return {
    page: page.page,
    loading: page.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPageDispatch: (bookId, pageId) => dispatch(fetchPage(bookId, pageId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DynamicPage));
