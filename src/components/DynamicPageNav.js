import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import DynamicPageMenuItem from './DynamicPageMenuItem';

class DynamicPageNav extends Component {
  onEditPage = () => {};

  onDeletePage = () => {};

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
        />
        <DynamicPageMenuItem
          key="trash"
          icon="trash"
          text="Delete this page"
          onClick={this.onDeletePage}
        />
        <DynamicPageMenuItem
          key="new"
          icon="plus"
          text="Create new sub page"
          onClick={this.onCreateSubPage}
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
};

export default withRouter(DynamicPageNav);
