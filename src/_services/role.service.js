import config from 'config'; 
import axios from 'axios';
var token = localStorage.getItem("token"); 

export const bookService = {   
    getAllRoles,  
    addBook, 
    getBook,   
    editBook,    
    deleteBook,  
    getOutOfStockBooks  
}; 
  
  
function getAllRoles() {
    return axios({
        method: 'GET',
        url: `${config.apiUrl}/role/get/all`,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token }
    }).then(handleResponse);
} 

function getOutOfStockBooks() {
    return axios({
        method: 'GET',
        url: `${config.apiUrl}/rest/book/getoutofstockbooks`,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token }
    }).then(handleResponse);
} 

function addBook(book) {
    return axios({
        method: 'POST',
        url: `${config.apiUrl}/rest/book/create`,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token },
        data: JSON.stringify(book)
    }).then(handleResponse);
}
function getBook(book_id) {
    return axios({
        method: 'GET',
        url: `${config.apiUrl}/rest/book/get/`+book_id,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token }
    }).then(handleResponse);
}
function editBook(book) {
    return axios({
        method: 'POST',
        url: `${config.apiUrl}/rest/book/edit`,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token },
        data: JSON.stringify(book)
    }).then(handleResponse);
}
function deleteBook(book_id) {
    return axios({
        method: 'GET',
        url: `${config.apiUrl}/rest/book/delete/`+book_id,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token }
    }).then(handleResponse);
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
