import { SET_LOADING } from './loadingTypes';

export const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload,
  };
};
