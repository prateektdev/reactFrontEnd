import { roleConstants } from '../_constants';

export function addRole(state = {}, action) { 
  switch (action.type) {
    case roleConstants.ROLE_CREATE_REQUEST:
      return { isRoleAdd: true };
    case roleConstants.ROLE_CREATE_SUCCESS:
    return { isRoleAdd: true,role:action.role.data };
    case roleConstants.ROLE_CREATE_FAILURE:
      return {isRoleAdd :false};
    default:
      return state
  }
}