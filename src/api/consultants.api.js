const BASE_URL = 'http://165.232.64.166'; // NODE Server Url
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

const createConsultant = async (form) => {
    const request = await fetch(`${consultantsURL}/create`, {
        method: 'POST',
        credentials: 'include',
        body: form,
    });

    const newConsultant = await request.json();

    if (!request.ok) {
        throw new Error('Error creating new Consultant', newConsultant.message);
    };
    return newConsultant;
};

export {
    getAllConsultants,
    createConsultant,
}