import { roleConstants } from '../_constants';

export function getRole(state = {}, action) {
  switch (action.type) {
    case roleConstants.ROLE_DETAILS_REQUEST:
      return { isrole: true };
    case roleConstants.ROLE_DETAILS_SUCCESS:
      return { isrole: true, role: action.role.data };
    case roleConstants.ROLE_DETAILS_FAILURE:
      return { isrole: false };
    default:
      return state
  }
}