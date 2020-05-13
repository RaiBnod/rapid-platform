import axios from 'axios';
import { FETCH_BOOKS_FAILURE, FETCH_BOOKS_REQUEST, FETCH_BOOKS_SUCCESS } from './bookTypes';

export const fetchBookRequest = () => {
  return {
    type: FETCH_BOOKS_REQUEST,
  };
};

export const fetchBookSuccess = (data) => {
  return {
    type: FETCH_BOOKS_SUCCESS,
    payload: data,
  };
};

export const fetchBookFailure = (error) => {
  return {
    type: FETCH_BOOKS_FAILURE,
    payload: error,
  };
};

export const fetchBooks = () => {
  return (dispatch) => {
    dispatch(fetchBookRequest());
    axios
      .get('http://localhost:8080/api/books')
      .then((res) => {
        dispatch(fetchBookSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchBookFailure(err.message));
      });
  };
};
