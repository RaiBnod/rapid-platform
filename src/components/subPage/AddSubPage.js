import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UIkit from 'uikit';
import { createFileName } from '../../utils';
import { addSubPage } from '../../redux/subPage/pageActions';

class AddSubPage extends Component {
  state = {
    title: '',
    slug: '',
    filename: '',
    content: '',
    isHtml: false,
  };

  change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isHtmlChange = (e) => {
    this.setState({ isHtml: e.target.checked });
  };

  submit = () => {
    const { title, slug, filename, content, isHtml } = this.state;
    const { addSubPageDispatch, book, page } = this.props;
    if (title && slug && filename && content) {
      addSubPageDispatch(book, page, title, slug, createFileName(filename, isHtml), content);
      this.clearState();
      const modal = UIkit.modal('#add-sub-page');
      modal.hide();
    }
  };

  clearState = () => {
    this.setState({ title: '', slug: '', filename: '', content: '', isHtml: false });
  };

  render() {
    const { title, slug, filename, content, isHtml } = this.state;
    return (
      <>
        <div
          key="new"
          role="presentation"
          onClick={() => this.onCreateSubPage}
          className="dynamic-page-menu-item"
          href="#add-sub-page"
          uk-toggle=""
        >
          <span className="icon" uk-icon="plus" />
          Create new sub page
        </div>
        <div id="add-sub-page" uk-modal="">
          <div className="uk-modal-dialog">
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button className="uk-modal-close-default" type="button" uk-close="" />
            <div className="uk-modal-header">
              <h2 className="uk-modal-title">Add Sub Page</h2>
            </div>
            <div className="uk-modal-body">
              <form>
                <div className="uk-margin">
                  <input
                    className="uk-input"
                    name="title"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={this.change}
                  />
                </div>
                <div className="uk-margin">
                  <input
                    className="uk-input"
                    name="slug"
                    type="text"
                    placeholder="Slug"
                    value={slug}
                    onChange={this.change}
                  />
                </div>
                <div className="uk-margin">
                  <input
                    className="uk-input"
                    name="filename"
                    type="text"
                    placeholder="File Name"
                    value={filename}
                    onChange={this.change}
                  />
                </div>

                <div className="uk-margin">
                  <textarea
                    className="uk-textarea"
                    name="content"
                    placeholder="Content"
                    rows={10}
                    value={content}
                    onChange={this.change}
                  />
                </div>
                <div className="uk-margin">
                  <input
                    id="sub-page-type"
                    className="uk-checkbox"
                    type="checkbox"
                    name="isHtml"
                    checked={isHtml}
                    onChange={this.isHtmlChange}
                  />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ marginLeft: 10 }} htmlFor="sub-page-type">
                    HTML
                  </label>
                </div>
              </form>
            </div>
            <div className="uk-modal-footer uk-text-right">
              <button className="uk-button uk-button-default uk-modal-close" type="button">
                Cancel
              </button>
              <button className="uk-button uk-button-primary" type="button" onClick={this.submit}>
                Save
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

AddSubPage.propTypes = {
  addSubPageDispatch: PropTypes.func.isRequired,
  book: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};

const mapStateToProps = ({
  nav: {
    active: { book = '', page = '' },
  },
}) => {
  return {
    book,
    page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSubPageDispatch: (book, page, title, slug, filename, content) =>
      dispatch(addSubPage(book, page, title, slug, filename, content)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSubPage);
