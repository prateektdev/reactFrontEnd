import { bookConstants, } from '../_constants';
import { bookService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const bookActions = {
    getAllRoles,
    addBook,
    getBook,
    editBook,
    deleteBook,
    getOutOfStockBooks
};

function getAllRoles() {
    return dispatch => {
        dispatch(request());
        bookService.getAllRoles()
            .then(
                books => {
                    dispatch(success(books));
                    dispatch(alertActions.success('done'));
                },
                error => {
                    dispatch(failure('error.'));
                    dispatch(alertActions.error('Error: Those credentials don’t look right. Please try again.'));
                }
            );
    };
    function request(books) { return { type: bookConstants.BOOK_LIST_REQUEST, books } }
    function success(books) { return { type: bookConstants.BOOK_LIST_SUCCESS, books } }
    function failure(error) { return { type: bookConstants.BOOK_LIST_FAILURE, error } }
}

function getOutOfStockBooks() {
    return dispatch => {
        dispatch(request());
        bookService.getOutOfStockBooks()
            .then(
                books => {
                    dispatch(success(books));
                    dispatch(alertActions.success('done'));
                },
                error => {
                    dispatch(failure('error.'));
                    dispatch(alertActions.error('Error: Those credentials don’t look right. Please try again.'));
                }
            );
    };
    function request(books) { return { type: bookConstants.BOOK_LIST_REQUEST, books } }
    function success(books) { return { type: bookConstants.BOOK_LIST_SUCCESS, books } }
    function failure(error) { return { type: bookConstants.BOOK_LIST_FAILURE, error } }
}

function addBook(book) {
    return dispatch => {
        dispatch(request(book));
        bookService.addBook(book)
            .then(
                book => {
                    dispatch(success(book));
                    history.push("/dashboard");
                },
                error => {
                    dispatch(failure('Incorrect Credentials.'));
                    dispatch(alertActions.error('Error: Those credentials don’t look right. Please try again.'));
                }
            );
    };
    function request(book) { return { type: bookConstants.BOOK_CREATE_REQUEST, book } }
    function success(book) { return { type: bookConstants.BOOK_CREATE_SUCCESS, book } }
    function failure(error) { return { type: bookConstants.BOOK_CREATE_FAILURE, error } }
}

function getBook(book_id) {
    return dispatch => {
        dispatch(request(book_id));
        bookService.getBook(book_id)
            .then(
                book => {
                    console.log("book ",book.data)
                    dispatch(success(book));
                    history.push("/editbook");
                },
                error => {
                    dispatch(failure('Error in fetching book details.'));
                    dispatch(alertActions.error('Error in fetching book details.'));
                }
            );
    };
    function request(book) { return { type: bookConstants.BOOK_DETAILS_REQUEST, book } }
    function success(book) { return { type: bookConstants.BOOK_DETAILS_SUCCESS, book } }
    function failure(error) { return { type: bookConstants.BOOK_DETAILS_FAILURE, error } }
}

function editBook(book) {
    return dispatch => {
        dispatch(request(book));
        bookService.editBook(book)
            .then(
                editbook => {
                    dispatch(success(editbook));
                    dispatch(alertActions.success('Updated Successfully.'));
                    history.push("/dashboard");
                },
                error => {
                    dispatch(failure('Incorrect Credentials.'));
                    dispatch(alertActions.error('Error: Those credentials don’t look right. Please try again.'));
                }
            );
    };
    function request(editbook) { return { type: bookConstants.BOOK_UPDATE_REQUEST, editbook } }
    function success(editbook) { return { type: bookConstants.BOOK_UPDATE_SUCCESS, editbook } }
    function failure(error) { return { type: bookConstants.BOOK_UPDATE_FAILURE, error } }
}

function deleteBook(book_id) {
    return dispatch => {
        dispatch(request(book_id));
        bookService.deleteBook(book_id)
            .then(
                deletebook => {
                    dispatch(success(deletebook));
                    dispatch(alertActions.success('Deleted Successfully'));
                    history.push("/dashbord");
                },
                error => {
                    dispatch(failure('Incorrect Credentials.'));
                    dispatch(alertActions.error('Error: Those credentials don’t look right. Please try again.'));
                }
            );
    };
    function request(deletebook) { return { type: bookConstants.BOOK_DELETE_REQUEST, deletebook } }
    function success(deletebook) { return { type: bookConstants.BOOK_DELETE_SUCCESS, deletebook } }
    function failure(error) { return { type: bookConstants.BOOK_DELETE_FAILURE, error } }
}
