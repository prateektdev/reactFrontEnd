import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios';
var token = localStorage.getItem("token"); 

export const userService = {
    login, 
    register,
    getAllUsers,
    getById,  
};

function login(email, password) {
    const userInfo = {
        username: email,
        password: password
    };
    return axios.post(`${config.apiUrl}/authenticate`, userInfo)
        //.then(handleResponse)
        .then(function (response) {
            if (response.data.token) {
                localStorage.setItem('name', response.data.name);
                localStorage.setItem('permission', JSON.parse(response.data.permission));
                localStorage.setItem('token', response.data.token);
            }
            return response.data ;
        });
} 
 
function getAllUsers() {
    return axios({
        method: 'GET',
        url: `${config.apiUrl}/rest/book/getallusers`,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token }
    }).then(handleResponse);
} 
function getById(id) {
    return axios({
        method: 'GET',
        url: `${config.apiUrl}/users/`+id,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token },
        data: { id: id }
    }).then(handleResponse); 
}
  

function register(user) { 
    
    return axios.post(`${config.apiUrl}/users/adduserbyadmin`, user).then(handleResponse);
    
}
 
  

// handle Response

function handleResponse(response) {

    console.log('response', response);

    if (response.status == 200||response.status == 201) {
        return response;
    } else {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
 
}
