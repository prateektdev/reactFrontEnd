import { bookConstants } from '../_constants';

export function getbooks(state = {}, action) { 
  switch (action.type) {
    case bookConstants.BOOK_LIST_REQUEST:
      return { isbooks: true };
    case bookConstants.BOOK_LIST_SUCCESS:
    return { isbooks: true,books:action.books.data };
    case bookConstants.BOOK_LIST_FAILURE:
      return {isbooks :false};
    default:
      return state
  }
}