import { SET_LOADING } from './loadingTypes';

const initialState = { loading: false, loadingCount: 0 };

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING: {
      let { loadingCount } = state;
      if (action.payload) loadingCount++;
      else loadingCount--;
      return {
        ...state,
        loadingCount,
        loading: loadingCount !== 0,
      };
    }
    default:
      return state;
  }
};

export default loadingReducer;
