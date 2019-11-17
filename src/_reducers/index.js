import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer'; 
import {getbooks} from './getbooks.reducer' ; 
import {getusers} from './getusers.reducer' ; 
import {updatebook} from './updatebook.reducer' ; 
import {createBook} from './createbook.reducer' ; 
import {getbook} from './getbook.reducer' ; 
import {deletebook} from './deletebook.reducer' ; 
 
 
const rootReducer = combineReducers({
  authentication,
  registration, 
  getbooks, 
  getusers,
  updatebook,
  createBook,
  getbook,
  deletebook
});

export default rootReducer;