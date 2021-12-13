// const BASE_URL = 'http://165.232.64.166'; // NODE Server Url
const BASE_URL = 'http://localhost:3500'; // NODE local Server Url
const consultantsURL = `${BASE_URL}/consultants`;

const getAllConsultants = async () => {
    const request = await fetch(consultantsURL, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const allConsultants = await request.json();

    if (!request.ok) {
        throw new Error('Error on fetch', allConsultants.message);
    };
    return allConsultants;
};

const getConsultantById = async (id) => {
    const request = await fetch(`${consultantsURL}/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const consultantById = await request.json();
    if (!request.ok) {
        throw new Error('Error on fetch', consultantById.message);
    };
    return consultantById;
}

const createConsultant = async (form) => {
    const request = await fetch(`${consultantsURL}/create`, {
        method: 'POST',
        credentials: 'include',
        body: form,
    });

    const newConsultant = await request.json();

    console.log(newConsultant)
    if (!request.ok) {
        throw new Error('Error creating new Consultant', newConsultant.message);
    };
    return newConsultant;
};

const updateConsultant = async (form) => {
    const request = await fetch(`${consultantsURL}/edit`, {
        method: 'PUT',
        credentials: 'include',
        body: form,
    });

    const updatedConsultant = await request.json();
    console.log(updatedConsultant)

    if (!request.ok) {
        throw new Error('Error creating new Contact', updatedConsultant.message);
    };
    return updatedConsultant;
};

export {
    getAllConsultants,
    getConsultantById,
    updateConsultant,
    createConsultant,
}