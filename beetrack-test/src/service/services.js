import CONSTANT from '../util/constant';

function getContacts(nPag, nLimit) {
    //return fetch(`${CONSTANT.HOST}${CONSTANT.PORT}/api/users?_page=${nPag}&_limit=${nLimit}`, {
    return fetch(`${CONSTANT.HOST_HEROKU}/api/users?_page=${nPag}&_limit=${nLimit}`, {
        method: 'get'
    })
};

function addContact(payload) {
    return fetch(`${CONSTANT.HOST_HEROKU}/api/users`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
};

function searchContact(text) {
    return fetch(`${CONSTANT.HOST_HEROKU}/api/users?q=${text}`, {
        method: 'get'
    })
};

function deleteContact(id) {
    return fetch(`${CONSTANT.HOST_HEROKU}/api/users/${id}`, {
        method: 'DELETE'
    })
};




let services = {
    getContacts,
    addContact,
    searchContact,
    deleteContact
}

export default services;