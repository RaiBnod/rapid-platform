import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPage } from '../../redux/page/pageActions';
import DynamicPageNav from '../DynamicPageNav';
import PageContentWrapper from './PageContentWrapper';
import ContentRender from './ContentRender';
import { isHtmlFile } from '../../utils';

class DynamicPage extends Component {
  state = {
    editMode: false,
  };

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

  onEditPage = () => {
    this.setState({ editMode: true });
  };

  onCancelPage = () => {
    this.setState({ editMode: false });
  };

  render() {
    const { editMode } = this.state;
    const { page } = this.props;
    const { sub_page_data: subPageData = [] } = page;
    let isHtml = isHtmlFile(page.filename);
    return (
      <>
        <div className="main">
          <div className="main-body">
            <h1 key={page.slug} id={page.slug}>
              {page.title}
            </h1>
            <div className="body-content">
              <div onDoubleClick={this.onEditPage}>
                <PageContentWrapper
                  key={page.slug}
                  page={page}
                  editMode={editMode}
                  isHtml={isHtml}
                  onCancelPage={this.onCancelPage}
                />
              </div>
              {subPageData.map(({ slug, title, data, filename }) => {
                isHtml = isHtmlFile(filename);
                return (
                  <Fragment key={slug}>
                    <h2 id={slug}>{title}</h2>
                    <ContentRender data={data} isHtml={isHtml} />
                  </Fragment>
                );
              })}
            </div>
          </div>
          <DynamicPageNav onEditPage={this.onEditPage} page={page} />
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
    filename: PropTypes.string,
    data: PropTypes.string,
    sub_page_data: PropTypes.array,
  }).isRequired,
  fetchPageDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ page }) => {
  return {
    page: page.page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPageDispatch: (bookId, pageId) => dispatch(fetchPage(bookId, pageId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DynamicPage));
