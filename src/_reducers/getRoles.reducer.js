import { roleConstants } from '../_constants';

export function getRoles(state = {}, action) { 
  switch (action.type) {
    case roleConstants.ROLE_LIST_REQUEST:
      return { isroles: true };
    case roleConstants.ROLE_LIST_SUCCESS:
    return { isroles: true,roles:action.roles.data };
    case roleConstants.ROLE_LIST_FAILURE:
      return {isroles :false};
    default:
      return state
  }
}