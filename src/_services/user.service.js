import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios';
var token = localStorage.getItem("token");

export const userService = {
    login,
    
};

function login(email, password) {
    const userInfo = {
        username: email,
        password: password
    };
    return axios.post(`${config.apiUrl}/authenticate`, userInfo)
        //.then(handleResponse)
        .then(function (response) {
            console.log(response)
            if (response.data.token) {
                localStorage.setItem('name', response.data.name);
                localStorage.setItem('permission', response.data.permission);
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        });
}