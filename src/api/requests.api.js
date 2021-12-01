// const BASE_URL = 'http://165.232.64.166'; // NODE Server Url
const BASE_URL = 'http://localhost:3500'; // NODE local Server Url
const requestsURL = `${BASE_URL}/requests`;

const getAllRequests = async () => {
    const request = await fetch(requestsURL, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const allrequests = await request.json();
    if(!request.ok) {
       throw new Error('Error on fetch', allrequests.message);
    };
    return allrequests;
};

const getRequestById = async (id) => {
    const request = await fetch(`${requestsURL}/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const allOwners = await request.json();
    // console.log(allOwners);
    if(!request.ok) {
       throw new Error('Error on fetch', allOwners.message);
    };
    return allOwners;
};

const getLastReference = async () => {
    const request = await fetch(`${requestsURL}/lastReference`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const lastReference = await request.json();

    let lr = 0;
    if (lastReference !== 0) lr = lastReference + 1;
    else lr = 1;
    if(!request.ok) {
       throw new Error('Error on fetch', lastReference.message);
    };
    return lr;
};

const createRequest = async (form) => {
    const request = await fetch(`${requestsURL}/create`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(form),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });

    const newRequest = await request.json();

    if(!request.ok) {
       throw new Error('Error creating new Request', newRequest.message);
    };
    return newRequest;
};

export {
    getAllRequests,
    getRequestById,
    getLastReference,
    createRequest,
}