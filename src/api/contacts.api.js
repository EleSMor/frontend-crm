import { BASE_URL } from "./constants"
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

    if (!request.ok) {
        throw new Error('Error on fetch', allContacts.message);
    };
    return allContacts;
};

const getContactById = async (id) => {
    const request = await fetch(`${contactsURL}/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const contactsByFullName = await request.json();

    if (!request.ok) {
        throw new Error('Error on fetch', contactsByFullName.message);
    };
    return contactsByFullName;
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

    if (!request.ok) {
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

    if (!request.ok) {
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

    if (!request.ok) {
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

    if (!request.ok) {
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
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });

    const newContact = await request.json();

    if (!request.ok) {
        throw new Error('Error creating new Contact', newContact.message);
    };
    return newContact;
};

export {
    getAllContacts,
    getContactsByFullName,
    getContactById,
    getContactsByMobileNumber,
    getContactsByEmail,
    getAllOwners,
    createContact,
}