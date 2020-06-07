import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MonacoEditor from 'react-monaco-editor';
import ContentRender from './ContentRender';
import { editPage } from '../../redux/page/pageActions';
import { isHtmlFile } from '../../utils';

class Editor extends Component {
  state = { data: '', mode: 'edit', isHtml: false };

  componentDidMount() {
    const { page } = this.props;
    const { data, filename } = page;
    this.setState({ isHtml: isHtmlFile(filename) });
    this.setState({ data });
  }

  editorDidMount = (editor) => {
    editor.focus();
  };

  changeMode = (mode) => {
    this.setState({ mode });
  };

  onChange = (newValue) => {
    this.setState({ data: newValue });
  };

  onTypeToggle = (e) => {
    this.setState({ isHtml: e.target.checked });
  };

  onSave = () => {
    const { editPageDispatch } = this.props;
    const { page, bookId, onCancelPage } = this.props;
    const { slug: pageId, title, filename } = page;
    const { data: content, isHtml } = this.state;
    editPageDispatch(bookId, pageId, title, filename, content, isHtml);
    onCancelPage();
  };

  onCancel = () => {
    const { onCancelPage } = this.props;
    onCancelPage();
  };

  render() {
    const { data, mode, isHtml } = this.state;
    return (
      <div className="editor">
        <button
          type="button"
          onClick={() => this.changeMode('edit')}
          className="uk-button uk-button-default"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => this.changeMode('preview')}
          className="uk-button uk-button-default"
        >
          Preview
        </button>
        <input type="checkbox" id="type" checked={isHtml} onChange={this.onTypeToggle} />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="type">HTML</label>
        {mode === 'edit' ? (
          <MonacoEditor
            height="460"
            language="javascript"
            theme="vs-dark"
            value={data}
            onChange={this.onChange}
            editorDidMount={this.editorDidMount}
          />
        ) : (
          <div className="preview">
            <ContentRender data={data} isHtml={isHtml} />
          </div>
        )}
        <button type="button" onClick={() => this.onSave()} className="uk-button uk-button-primary">
          Save
        </button>
        <button type="button" onClick={this.onCancel} className="uk-button uk-button-danger">
          Cancel
        </button>
      </div>
    );
  }
}

Editor.propTypes = {
  page: PropTypes.shape({
    data: PropTypes.string,
    slug: PropTypes.string,
    title: PropTypes.string,
    filename: PropTypes.string,
  }).isRequired,
  bookId: PropTypes.string.isRequired,
  onCancelPage: PropTypes.func.isRequired,
  editPageDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  nav: {
    active: { book },
  },
}) => {
  return {
    bookId: book,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editPageDispatch: (bookId, pageId, title, filename, content, isHtml) =>
      dispatch(editPage(bookId, pageId, title, filename, content, isHtml)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
