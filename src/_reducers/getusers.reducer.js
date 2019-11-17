import {userConstants } from '../_constants';

export function getusers(state = {}, action) { 
  switch (action.type) {
    case userConstants.USERS_LIST_REQUEST:
      return { isbooks: true };
    case userConstants.USERS_LIST_SUCCESS:
    return { isbooks: true,users:action.users.data };
    case userConstants.USERS_LIST_FAILURE:
      return {isbooks :false};
    default:
      return state
  }
}