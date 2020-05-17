import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UIkit from 'uikit';
import { addBook } from '../../redux';

class AddBook extends Component {
  state = {
    title: '',
    slug: '',
  };

  change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submit = () => {
    const { title, slug } = this.state;
    const { addBookDispatch } = this.props;
    if (title && slug) {
      addBookDispatch(title, slug);
      this.clearState();
      const modal = UIkit.modal('#add-book');
      modal.hide();
    }
  };

  clearState = () => {
    this.setState({ title: '', slug: '' });
  };

  render() {
    const { title, slug } = this.state;
    return (
      <div className="uk-margin">
        <button
          className="uk-button uk-button-primary"
          type="button"
          onClick={this.addBook}
          href="#add-book"
          uk-toggle=""
        >
          Add Book
        </button>
        <div id="add-book" uk-modal="">
          <div className="uk-modal-dialog">
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button className="uk-modal-close-default" type="button" uk-close="" />
            <div className="uk-modal-header">
              <h2 className="uk-modal-title">Add Book</h2>
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
      </div>
    );
  }
}

AddBook.propTypes = {
  addBookDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBookDispatch: (title, slug) => dispatch(addBook(title, slug)),
  };
};

export default connect(null, mapDispatchToProps)(AddBook);
