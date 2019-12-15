import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import {addRole} from './addRole.reducer' ; 
import {editRole} from './editRole.reducer' ; 
import {getRole} from './getRole.reducer' ; 
import {getRoles} from './getRoles.reducer' ; 
 
 
const rootReducer = combineReducers({
  authentication,
  getRoles,
  addRole,
  getRole,
  editRole
});

export default rootReducer;