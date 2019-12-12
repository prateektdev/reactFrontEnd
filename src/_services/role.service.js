import config from 'config';
import axios from 'axios';
var token = localStorage.getItem("token");

export const roleService = {
    getAllRoles,
    addRole,
    getRole,
    editRole,
};


function getAllRoles() {
    return axios({
        method: 'GET',
        url: `${config.apiUrl}/role/get/list-of-role`,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
    }).then(handleResponse);
}

function addRole(role) {
    return axios({
        method: 'POST',
        url: `${config.apiUrl}/role/create/new/role`,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        data: JSON.stringify(role)
    }).then(handleResponse);
}
function getRole(role_id) {
    return axios({
        method: 'GET',
        url: `${config.apiUrl}/role/get/details/` + role_id,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
    }).then(handleResponse);
}
function editRole(role) {
    return axios({
        method: 'POST',
        url: `${config.apiUrl}/role/update/role`,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        data: JSON.stringify(role)
    }).then(handleResponse);
}

function handleResponse(response) {
    console.log('response', response);
    if (response.status == 200 || response.status == 201) {
        return response;
    } else {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }


    // return response.text().then(text => {
    //     const data = text && JSON.parse(text);
    //     console.log('data',data);
    // console.log('<<<<<<<<<<<<<<<<<<<<<');
    //     if (!response.ok) {
    //         if (response.status === 401) {
    //             // auto logout if 401 response returned from api
    //             logout();
    //             location.reload(true);
    //         }
    //         const error = (data && data.message) || response.statusText;
    //         return Promise.reject(error);
    //     }

    //     console.log('data',data);
    //     return data;
    // });
}
