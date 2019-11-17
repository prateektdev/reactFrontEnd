import { userConstants, clauseConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers'; 

export const userActions = {
    login,
    logout,
    register,
    getAllUsers    
};  

function getAllUsers() {
    return dispatch => {
        dispatch(request("get users"));
        userService.getAllUsers()
            .then(
                users => {
                    dispatch(success(users));
                    dispatch(alertActions.success('done'));
                },
                error => {
                    dispatch(failure('error.'));
                    dispatch(alertActions.error('Error: Those credentials don’t look right. Please try again.'));
                }
            );
    };
    function request(users) { return { type: userConstants.USERS_LIST_REQUEST, users } }
    function success(users) { return { type: userConstants.USERS_LIST_SUCCESS, users } }
    function failure(error) { return { type: userConstants.USERS_LIST_FAILURE, error } }
}
function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                token => { 
                    if(token==null||token==undefined||token=="invalid credentials"){ 
                        dispatch(alertActions.error("unable to login"));
                    }else{
                        dispatch(success("Logged in "));
                        history.push('/dashboard'); 
                    }
                },
                error => {
                    dispatch(failure('Incorrect Credentials.'));
                    dispatch(alertActions.error('Error: Those credentials don’t look right. Please try again.'));
                }
            );
    };
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() { 
    localStorage.removeItem("token") ;
    history.push("/login") ;
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));
        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/signup');
                    dispatch(alertActions.success('Registration successful. Invitiation send on your mail box.'));
                },
                error => {
                    console.log("error : ",error)
                    dispatch(failure('Email is already exist.'));
                    dispatch(alertActions.error('Email is already exist'));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

 