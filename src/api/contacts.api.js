// const BASE_URL = 'http://165.232.64.166'; // NODE Server Url
const BASE_URL = 'http://localhost:3500'; // NODE local Server Url
const contactsURL = `${BASE_URL}/contacts`;

const getAllContacts = async () => {
    const request = await fetch(contactsURL, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const allContacts = await request.json();

    if(!request.ok) {
       throw new Error('Error on fetch', allContacts.message);
    };
    return allContacts;
};

const getContactsByFullName = async (fullName) => {
    const request = await fetch(`${contactsURL}/fullName/${fullName}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const contactsByFullName = await request.json();

    if(!request.ok) {
       throw new Error('Error on fetch', contactsByFullName.message);
    };
    return contactsByFullName;
};

const getContactsByMobileNumber = async (mobileNumber) => {
    const request = await fetch(`${contactsURL}/mobileNumber/${mobileNumber}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const contactsByMobileNumber = await request.json();
    console.log("respuesta del back en mobile:", contactsByMobileNumber)

    if(!request.ok) {
       throw new Error('Error on fetch', contactsByMobileNumber.message);
    };
    return contactsByMobileNumber;
};

const getContactsByEmail = async (email) => {
    const request = await fetch(`${contactsURL}/email/${email}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const contactsByEmail = await request.json();

    if(!request.ok) {
       throw new Error('Error on fetch', contactsByEmail.message);
    };
    return contactsByEmail;
};

const getAllOwners = async () => {
    const request = await fetch(`${contactsURL}/owners`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const allOwners = await request.json();

    if(!request.ok) {
       throw new Error('Error on fetch', allOwners.message);
    };
    return allOwners;
};

const createContact = async (form) => {
    const request = await fetch(`${contactsURL}/create`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(form),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
        },
    });

    const newContact = await request.json();

    if(!request.ok) {
       throw new Error('Error creating new Contact', newContact.message);
    };
    return newContact;
};

export {
    getAllContacts,
    getContactsByFullName,
    getContactsByMobileNumber,
    getContactsByEmail,
    getAllOwners,
    createContact,
}