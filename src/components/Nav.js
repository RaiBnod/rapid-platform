import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBooks } from '../redux';

class Nav extends Component {
  componentDidMount() {
    const { props } = this;
    props.fetchBooks();
  }

  render() {
    const { books } = this.props;
    return (
      <div className="nav-wrapper">
        <div className="navigation">Book1 &gt; Page1 &gt; SubPage1</div>
        <div className="uk-margin">
          <form className="uk-search uk-search-default">
            <span uk-search-icon="" />
            <input className="uk-search-input" type="search" placeholder="Search..." />
          </form>
        </div>

        <div className="uk-width-1-2@s uk-width-2-5@m">
          <ul className="uk-nav-default uk-nav-parent-icon" uk-nav="">
            <li className="uk-active">
              <Link to="/">{books}</Link>
            </li>
            <li className="uk-parent">
              <Link to="/">Book 2</Link>
              <ul className="uk-nav-sub">
                <li>
                  <Link to="/">Page 1</Link>
                </li>
                <li>
                  <Link to="/">Page 2</Link>
                  <ul>
                    <li>
                      <Link to="/">Sub Page 1</Link>
                    </li>
                    <li>
                      <Link to="/">Sub Page 2</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="uk-parent">
              <Link to="/">Book3</Link>
              <ul className="uk-nav-sub">
                <li>
                  <Link to="/">Page 1</Link>
                </li>
                <li>
                  <Link to="/">Page 2</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.book && state.book.books && state.book.books.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBooks: () => dispatch(fetchBooks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
