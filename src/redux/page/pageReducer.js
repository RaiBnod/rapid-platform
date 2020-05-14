import { FETCH_PAGE_FAILURE, FETCH_PAGE_REQUEST, FETCH_PAGE_SUCCESS } from './pageTypes';

const initialState = { loading: false, page: {}, error: '' };

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PAGE_SUCCESS:
      return {
        ...state,
        error: '',
        page: action.payload,
        loading: false,
      };
    case FETCH_PAGE_FAILURE:
      return {
        ...state,
        page: {},
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default pageReducer;
