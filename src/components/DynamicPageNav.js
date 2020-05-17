import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UIkit from 'uikit';
import DynamicPageMenuItem from './DynamicPageMenuItem';
import { deletePage } from '../redux/page/pageActions';

const EDIT_PAGE_ID = 'edit-page-id';
const DELETE_PAGE_ID = 'delete-page-id';
const CREATE_SUB_PAGE_PAGE_ID = 'create-sub-page-page-id';

class DynamicPageNav extends Component {
  onEditPage = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onEditPage();
  };

  onDeletePage = () => {
    UIkit.util.on(`#${DELETE_PAGE_ID}`, 'click', (e) => {
      e.preventDefault();
      e.target.blur();
      UIkit.modal.confirm('Do you want to delete this page?').then(() => {
        const { deletePageDispatch, bookId, pageId, history } = this.props;
        deletePageDispatch(bookId, pageId);
        history.push('/');
      });
    });
  };

  onCreateSubPage = () => {};

  render() {
    const { page } = this.props;
    const { sub_page_data: subPageData = [] } = page;
    return (
      <div className="dynamic-page-nav">
        <div className="title">In this Article</div>
        <hr />
        <ul>
          <li key={page.slug}>
            <a href={`#${page.slug}`}>{page.title}</a>
          </li>
          {subPageData.map((sp) => {
            return (
              <li key={sp.slug}>
                <a href={`#${sp.slug}`}>{sp.title}</a>
              </li>
            );
          })}
        </ul>
        <hr />
        <DynamicPageMenuItem
          key="edit"
          icon="file-edit"
          text="Edit this page"
          onClick={this.onEditPage}
          id={EDIT_PAGE_ID}
        />
        <DynamicPageMenuItem
          key="trash"
          icon="trash"
          text="Delete this page"
          onClick={this.onDeletePage}
          id={DELETE_PAGE_ID}
        />
        <DynamicPageMenuItem
          key="new"
          icon="plus"
          text="Create new sub page"
          onClick={this.onCreateSubPage}
          id={CREATE_SUB_PAGE_PAGE_ID}
        />
      </div>
    );
  }
}

DynamicPageNav.propTypes = {
  page: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.string,
    sub_page_data: PropTypes.array,
  }).isRequired,
  onEditPage: PropTypes.func.isRequired,
  deletePageDispatch: PropTypes.func.isRequired,
  bookId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  nav: {
    active: { book = '', page = '' },
  },
}) => {
  return {
    bookId: book,
    pageId: page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePageDispatch: (bookId, pageId) => dispatch(deletePage(bookId, pageId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DynamicPageNav));
