import { roleConstants } from '../_constants';
import { roleService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const roleActions = {
    getAllRoles,
    addRole,
    getRole,
    editRole,
};

function getAllRoles() {
    return dispatch => {
        dispatch(request());
        roleService.getAllRoles()
            .then(
                roles => {
                    console.log('here .........')
                    dispatch(success(roles));
                    dispatch(alertActions.success('done'));
                },
                error => {
                    dispatch(failure('error.'));
                    dispatch(alertActions.error('Error: Those credentials don’t look right. Please try again.'));
                }
            );
    };
    function request(roles) { return { type: roleConstants.ROLE_LIST_REQUEST, roles } }
    function success(roles) { return { type: roleConstants.ROLE_LIST_SUCCESS, roles } }
    function failure(error) { return { type: roleConstants.ROLE_LIST_FAILURE, error } }
}

function addRole(book) {
    return dispatch => {
        dispatch(request(book));
        roleService.addBook(book)
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
    function request(book) { return { type: roleConstants.ROLE_CREATE_REQUEST, book } }
    function success(book) { return { type: roleConstants.ROLE_CREATE_SUCCESS, book } }
    function failure(error) { return { type: roleConstants.ROLE_CREATE_FAILURE, error } }
}

function getRole(book_id) {
    return dispatch => {
        dispatch(request(book_id));
        roleService.getBook(book_id)
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
    function request(book) { return { type: roleConstants.ROLE_DETAILS_REQUEST, book } }
    function success(book) { return { type: roleConstants.ROLE_DETAILS_SUCCESS, book } }
    function failure(error) { return { type: roleConstants.ROLE_DETAILS_FAILURE, error } }
}

function editRole(book) {
    return dispatch => {
        dispatch(request(book));
        roleService.editBook(book)
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
    function request(editbook) { return { type: roleConstants.ROLE_UPDATE_REQUEST, editbook } }
    function success(editbook) { return { type: roleConstants.ROLE_UPDATE_SUCCESS, editbook } }
    function failure(error) { return { type: roleConstants.ROLE_UPDATE_FAILURE, error } }
}
