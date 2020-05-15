import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class DynamicPageNav extends Component {
  render() {
    const { page } = this.props;
    const { sub_page_data: subPageData = [] } = page;
    return (
      <div className="dynamic-page-nav">
        <h3>In this Article</h3>
        <ul>
          <li>
            <a href={`#${page.slug}`}>{page.title}</a>
          </li>
          {subPageData.map((sp) => {
            return (
              <li>
                <a href={`#${sp.slug}`}>{sp.title}</a>
              </li>
            );
          })}
        </ul>
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
