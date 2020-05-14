import { combineReducers } from 'redux';
import bookReducer from './book/bookReducer';
import navReducer from './nav/navReducer';
import pageReducer from './page/pageReducer';
import loadingReducer from './loading/loadingReducer';

const rootReducer = combineReducers({
  loading: loadingReducer,
  book: bookReducer,
  nav: navReducer,
  page: pageReducer,
});
export default rootReducer;
