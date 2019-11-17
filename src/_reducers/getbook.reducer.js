import { bookConstants } from '../_constants';

export function getbook(state = {}, action) { 
  switch (action.type) {
    case bookConstants.BOOK_DETAILS_REQUEST:
      return { isbooks: true };
    case bookConstants.BOOK_DETAILS_SUCCESS:
    return { isbooks: true,book:action.book.data };
    case bookConstants.BOOK_DETAILS_FAILURE:
      return {isbooks :false};
    default:
      return state
  }
}