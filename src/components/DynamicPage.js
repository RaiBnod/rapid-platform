import React, { Component, Fragment } from 'react';
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
    if (nextProps.location.pathname !== location.pathname) {
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
    const { sub_page_data: subPageData = [] } = page;

    return (
      <>
        <div className="main">
          <div className="main-body">
            <h1 key={page.slug} id={page.slug}>
              {page.title}
            </h1>
            {page.data}
            {subPageData.map(({ slug, title, data }) => {
              return (
                <Fragment key={slug}>
                  <h2 id={slug}>{title}</h2>
                  {data}
                </Fragment>
              );
            })}
          </div>
          <DynamicPageNav page={page} />
        </div>
      </>
    );
  }
}

DynamicPage.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  page: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.string,
    sub_page_data: PropTypes.array,
  }).isRequired,
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
