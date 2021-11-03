const BASE_URL = 'http://localhost:3500'; // NODE Server Url
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
    // console.log(allContacts);
    if(!request.ok) {
       throw new Error('Error on fetch', allContacts.message);
    };
    return allContacts;
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

    if(!request.ok) {
       throw new Error('Error creating new Contact', newContact.message);
    };
    return newContact;
};

export {
    getAllContacts,
    createContact,
}