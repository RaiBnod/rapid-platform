import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UIkit from 'uikit';
import { withRouter } from 'react-router-dom';
import { addPage } from '../../redux/page/pageActions';
import { createFileName } from '../../utils';

class AddPage extends Component {
  state = {
    title: '',
    slug: '',
    filename: '',
    isHtml: false,
  };

  change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isHtmlChange = (e) => {
    this.setState({ isHtml: e.target.checked });
  };

  submit = () => {
    const { title, slug, filename, isHtml } = this.state;
    const { addPageDispatch, book, history } = this.props;
    if (title && slug && filename) {
      addPageDispatch(book, title, slug, createFileName(filename, isHtml));
      this.clearState();
      const modal = UIkit.modal('#add-page');
      modal.hide();
      history.push(`/${book}/${slug}`);
    }
  };

  clearState = () => {
    this.setState({ title: '', slug: '', filename: '', isHtml: false });
  };

  render() {
    const { title, slug, filename, isHtml } = this.state;
    return (
      <>
        <div className="add-page">
          <button
            className="uk-button uk-button-primary"
            type="button"
            href="#add-page"
            uk-toggle=""
          >
            Add Page
          </button>
        </div>
        <div id="add-page" uk-modal="">
          <div className="uk-modal-dialog">
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button className="uk-modal-close-default" type="button" uk-close="" />
            <div className="uk-modal-header">
              <h2 className="uk-modal-title">Add Page</h2>
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
                  <input
                    id="page-type"
                    className="uk-checkbox"
                    type="checkbox"
                    name="isHtml"
                    checked={isHtml}
                    onChange={this.isHtmlChange}
                  />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ marginLeft: 10 }} htmlFor="page-type">
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

AddPage.propTypes = {
  addPageDispatch: PropTypes.func.isRequired,
  book: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  nav: {
    active: { book = '' },
  },
}) => {
  return {
    book,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPageDispatch: (book, title, slug, filename) =>
      dispatch(addPage(book, title, slug, filename)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddPage));
