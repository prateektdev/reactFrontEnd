import { roleConstants } from '../_constants';

export function editRole(state = {}, action) {
  switch (action.type) {
    case roleConstants.ROLE_UPDATE_REQUEST:
      return { isrole: true };
    case roleConstants.ROLE_UPDATE_SUCCESS:
      return { isrole: true, role: action.editrole.data };
    case roleConstants.ROLE_UPDATE_FAILURE:
      return { isrole: false };
    default:
      return state
  }
}