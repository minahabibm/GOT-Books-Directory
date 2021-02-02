import { combineReducers } from 'redux';

import initialState from './initial-state';
import selectTheme from './theme-selection';
import visibility from './visibility';
import bookInfo from './book-info';

const rootReducer = combineReducers({
  initialState,
  selectTheme,
  visibility,
  bookInfo,
});

export default rootReducer;
