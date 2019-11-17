import { bookConstants } from '../_constants';

export function createBook(state = {}, action) { 
  switch (action.type) {
    case bookConstants.BOOK_CREATE_REQUEST:
      return { isbooks: true };
    case bookConstants.BOOK_CREATE_SUCCESS:
    return { isbooks: true,book:action.book.data };
    case bookConstants.BOOK_CREATE_FAILURE:
      return {isbooks :false};
    default:
      return state
  }
}