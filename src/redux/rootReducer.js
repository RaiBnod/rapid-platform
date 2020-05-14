import { combineReducers } from 'redux';
import bookReducer from './book/bookReducer';
import navReducer from './nav/navReducer';
import pageReducer from './page/pageReducer';

const rootReducer = combineReducers({
  book: bookReducer,
  nav: navReducer,
  page: pageReducer,
});
export default rootReducer;
