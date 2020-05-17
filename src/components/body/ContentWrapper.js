import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from './Editor';
import ContentRender from './ContentRender';

class ContentWrapper extends Component {
  state = {
    editMode: false,
  };

  edit = () => {
    this.setState({ editMode: true });
  };

  onCancel = () => {
    this.setState({ editMode: false });
  };

  render() {
    const { editMode } = this.state;
    const { page, editable } = this.props;
    const { data } = page;
    const isHtml = page && page.filename && page.filename.substr(-3) !== '.md';

    const renderEditable = editable ? (
      <div onDoubleClick={this.edit}>
        <ContentRender data={data} isHtml={isHtml} />
      </div>
    ) : (
      <ContentRender data={data} isHtml={isHtml} />
    );
    return !editMode ? renderEditable : data && <Editor data={data} onCancel={this.onCancel} />;
  }
}

ContentWrapper.propTypes = {
  page: PropTypes.shape({
    data: PropTypes.string,
    filename: PropTypes.string,
  }).isRequired,
  editable: PropTypes.bool.isRequired,
};

export default ContentWrapper;
