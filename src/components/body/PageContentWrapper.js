import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from './Editor';
import ContentRender from './ContentRender';

class PageContentWrapper extends Component {
  render() {
    const { page, editMode, isHtml, onCancelPage } = this.props;
    const { data } = page;
    const renderEditable = <ContentRender data={data} isHtml={isHtml} />;
    return !editMode ? renderEditable : data && <Editor page={page} onCancelPage={onCancelPage} />;
  }
}

PageContentWrapper.propTypes = {
  page: PropTypes.shape({
    data: PropTypes.string,
  }).isRequired,
  editMode: PropTypes.bool.isRequired,
  onCancelPage: PropTypes.func.isRequired,
  isHtml: PropTypes.bool.isRequired,
};

export default PageContentWrapper;
