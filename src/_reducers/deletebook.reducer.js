import { bookConstants } from '../_constants';

export function deletebook(state = {}, action) { 
  switch (action.type) {
    case bookConstants.BOOK_DELETE_REQUEST:
      return { isbooks: true };
    case bookConstants.BOOK_DELETE_SUCCESS:
    return { isbooks: true,editbook:action.editbook.data };
    case bookConstants.BOOK_DELETE_FAILURE:
      return {isbooks :false};
    default:
      return state
  }
}