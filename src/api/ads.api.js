// const BASE_URL = 'http://165.232.64.166'; // NODE Server Url
const BASE_URL = 'http://localhost:3500'; // NODE local Server Url
const adsURL = `${BASE_URL}/ads`;

const getAllAds = async () => {
    const request = await fetch(adsURL, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const allAds = await request.json();
    if (!request.ok) {
        throw new Error('Error on fetch', allAds.message);
    };
    return allAds;
};

const getAdById = async (id) => {
    const request = await fetch(`${adsURL}/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const adById = await request.json();
    if (!request.ok) {
        throw new Error('Error on fetch', adById.message);
    };
    return adById;
}

const getMatchedRequests = async (id) => {
    const request = await fetch(`${adsURL}/matching/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const allRequests = await request.json();
    if (!request.ok) {
        throw new Error('Error on fetch', allRequests.message);
    };
    return allRequests;
}

const createAd = async (form) => {
    const request = await fetch(`${adsURL}/create`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(form),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });

    const newAd = await request.json();

    if (!request.ok) {
        throw new Error('Error creating new Contact', newAd.message);
    };
    return newAd;
};

const updateAd = async (form) => {
    const request = await fetch(`${adsURL}/edit`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const updatedAd = await request.json();
    console.log(updatedAd)

    if (!request.ok) {
        throw new Error('Error creating new Contact', updatedAd.message);
    };
    return updatedAd;
};

export {
    getAllAds,
    getAdById,
    createAd,
    updateAd,
    getMatchedRequests
}