import { FETCH_BOOKS_REQUEST, FETCH_BOOKS_SUCCESS, FETCH_BOOKS_FAILURE } from './bookTypes';

const initialState = { loading: false, books: [], error: '' };

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload,
        error: '',
        loading: false,
      };
    case FETCH_BOOKS_FAILURE:
      return {
        ...state,
        books: [],
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default bookReducer;
