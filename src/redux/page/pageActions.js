import axios from 'axios';
import { FETCH_PAGE_FAILURE, FETCH_PAGE_REQUEST, FETCH_PAGE_SUCCESS } from './pageTypes';
import { getUrl } from '../../utils';

export const fetchPageRequest = () => {
  return {
    type: FETCH_PAGE_REQUEST,
  };
};

export const fetchPageSuccess = (data) => {
  return {
    type: FETCH_PAGE_SUCCESS,
    payload: data,
  };
};

export const fetchPageFailure = (error) => {
  return {
    type: FETCH_PAGE_FAILURE,
    payload: error,
  };
};

export const fetchPage = (book, page) => {
  return (dispatch) => {
    dispatch(fetchPageRequest());
    axios
      .get(getUrl(`/api/book/${book}/page/${page}`))
      .then((res) => {
        dispatch(fetchPageSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchPageFailure(err.message));
      });
  };
};
