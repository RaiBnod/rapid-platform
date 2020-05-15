import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchBooks } from '../redux';

class Nav extends Component {
  componentDidMount() {
    const { fetchBooksDispatch } = this.props;
    fetchBooksDispatch();
  }

  addBook = () => {};

  addPage = () => {};

  renderSideBarNavigation = (books, active) => {
    return (
      <div className="uk-width-1-2@s uk-width-2-5@m">
        <ul className="uk-nav-default uk-nav-parent-icon" uk-nav="">
          {books.map((book) => {
            let className = 'uk-parent';
            const isActive = active.book === book.slug;
            if (isActive) className += ' uk-active';
            return (
              <li className={className} key={book.slug}>
                <Link to={`/${book.slug}/index`}>{book.slug}</Link>
                {book.pages && (
                  <ul className="uk-nav-sub uk-active">
                    {book.pages.map((page) => (
                      <li key={page}>
                        <Link to={`/${book.slug}/${page}`}>{page}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  render() {
    const { books, active } = this.props;
    return (
      <div className="nav-wrapper">
        <div className="nav-wrapper-content">
          {active.book && (
            <div className="navigation">
              {active.book} &gt; {active.page}
            </div>
          )}
          <div className="uk-margin">
            <button className="uk-button uk-button-primary" type="button" onClick={this.addBook}>
              Add Book
            </button>
          </div>
          {this.renderSideBarNavigation(books, active)}
        </div>
        <div className="add-page">
          <button className="uk-button uk-button-primary" type="button" onClick={this.addPage}>
            Add Page
          </button>
        </div>
      </div>
    );
  }
}

Nav.propTypes = {
  books: PropTypes.array.isRequired,
  active: PropTypes.shape({ book: PropTypes.string, page: PropTypes.string }).isRequired,
  fetchBooksDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ book, nav }) => {
  return {
    books: book.books,
    active: nav.active,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBooksDispatch: () => dispatch(fetchBooks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
