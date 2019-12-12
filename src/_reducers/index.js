import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import {addRole} from './addRole.reducer' ; 
import {getRoles} from './getRoles.reducer' ; 
 
 
const rootReducer = combineReducers({
  authentication,
  getRoles,
  addRole
});

export default rootReducer;