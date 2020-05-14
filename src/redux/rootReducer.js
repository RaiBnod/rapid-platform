import { combineReducers } from 'redux';
import bookReducer from './book/bookReducer';
import navReducer from './nav/navReducer';

const rootReducer = combineReducers({
  book: bookReducer,
  nav: navReducer,
});
export default rootReducer;
