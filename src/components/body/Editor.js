import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentRender from './ContentRender';

class Editor extends Component {
  state = { data: '', mode: 'edit', isHtml: false };

  componentDidMount() {
    const { data } = this.props;
    this.setState({ data });
  }

  textChange = (e) => {
    this.setState({ data: e.target.value });
  };

  changeMode = (mode) => {
    this.setState({ mode });
  };

  onTypeToggle = (e) => {
    this.setState({ isHtml: e.target.checked });
  };

  onSave = () => {};

  onCancel = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onCancel();
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
        <input type="checkbox" id="type" onChange={this.onTypeToggle} />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="type">HTML</label>
        {mode === 'edit' ? (
          <textarea onChange={this.textChange} value={data} />
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
  data: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Editor;
