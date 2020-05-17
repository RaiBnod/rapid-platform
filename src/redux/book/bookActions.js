import axios from 'axios';
import { FETCH_BOOKS_FAILURE, FETCH_BOOKS_REQUEST, FETCH_BOOKS_SUCCESS } from './bookTypes';
import { getUrl } from '../../utils';
import { setLoading } from '../loading/loadingActions';

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
    dispatch(setLoading(true));
    axios
      .get(getUrl('/api/books'))
      .then((res) => {
        if (res.status === 200) {
          // TODO: remove setTime (delaying just to see effect)
          setTimeout(() => {
            dispatch(fetchBookSuccess(res.data));
            dispatch(setLoading(false));
          }, 1000);
        } else {
          dispatch(setLoading(false));
        }
      })
      .catch((err) => {
        dispatch(fetchBookFailure(err.message));
        dispatch(setLoading(false));
      });
  };
};

export const addBook = (title, slug) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios
      .post(getUrl('/api/book'), { title, slug, content: 'Edit page content...' })
      .then(() => {
        dispatch(fetchBooks());
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(fetchBookFailure(err.message));
        dispatch(setLoading(false));
      });
  };
};
