import axios from 'axios';
import { FETCH_PAGE_FAILURE, FETCH_PAGE_REQUEST, FETCH_PAGE_SUCCESS } from './pageTypes';
import { getUrl } from '../../utils';
import { setLoading } from '../loading/loadingActions';
import { setActiveNav } from '..';

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
    dispatch(setLoading(true));
    axios
      .get(getUrl(`/api/book/${book}/page/${page}`))
      .then((res) => {
        // TODO: remove setTime (delaying just to see effect)
        setTimeout(() => {
          dispatch(fetchPageSuccess(res.data));
          dispatch(setLoading(false));
          dispatch(setActiveNav({ book, page }));
        }, 1000);
      })
      .catch((err) => {
        dispatch(fetchPageFailure(err.message));
        dispatch(setLoading(false));
      });
  };
};
