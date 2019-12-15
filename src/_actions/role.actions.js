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

function addRole(role) {
    return dispatch => {
        dispatch(request(role));
        roleService.addRole(role)
            .then(
                role => {
                    dispatch(success(role));
                    history.push("/dashboard");
                },
                error => {
                    dispatch(failure('Incorrect Credentials.'));
                    dispatch(alertActions.error('Error: Those credentials don’t look right. Please try again.'));
                }
            );
    };
    function request(role) { return { type: roleConstants.ROLE_CREATE_REQUEST, role } }
    function success(role) { return { type: roleConstants.ROLE_CREATE_SUCCESS, role } }
    function failure(error) { return { type: roleConstants.ROLE_CREATE_FAILURE, error } }
}

function getRole(role_id) {
    return dispatch => {
        dispatch(request(role_id));
        roleService.getRole(role_id)
            .then(
                role => {
                    dispatch(success(role));
                    history.push("/role");
                },
                error => {
                    dispatch(failure('Error in fetching role details.'));
                    dispatch(alertActions.error('Error in fetching role details.'));
                }
            );
    };
    function request(role) { return { type: roleConstants.ROLE_DETAILS_REQUEST, role } }
    function success(role) { return { type: roleConstants.ROLE_DETAILS_SUCCESS, role } }
    function failure(error) { return { type: roleConstants.ROLE_DETAILS_FAILURE, error } }
}

function editRole(role) {
    return dispatch => {
        dispatch(request(role));
        roleService.editRole(role)
            .then(
                editrole => {
                    dispatch(success(editrole));
                    dispatch(alertActions.success('Updated Successfully.'));
                    history.push("/");
                },
                error => {
                    dispatch(failure('Incorrect Credentials.'));
                    dispatch(alertActions.error('Error: Those credentials don’t look right. Please try again.'));
                }
            );
    };
    function request(editrole) { return { type: roleConstants.ROLE_UPDATE_REQUEST, editrole } }
    function success(editrole) { return { type: roleConstants.ROLE_UPDATE_SUCCESS, editrole } }
    function failure(error) { return { type: roleConstants.ROLE_UPDATE_FAILURE, error } }
}
