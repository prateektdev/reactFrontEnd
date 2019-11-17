import { bookConstants } from '../_constants';

export function updatebook(state = {}, action) { 
  switch (action.type) {
    case bookConstants.BOOK_UPDATE_REQUEST:
      return { isbooks: true };
    case bookConstants.BOOK_UPDATE_SUCCESS:
    return { isbooks: true,editbook:action.editbook.data };
    case bookConstants.BOOK_UPDATE_FAILURE:
      return {isbooks :false};
    default:
      return state
  }
}