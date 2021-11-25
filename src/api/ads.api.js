const BASE_URL = 'http://localhost:3500'; // NODE Server Url
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
    // console.log(allAds);
    if(!request.ok) {
       throw new Error('Error on fetch', allAds.message);
    };
    return allAds;
};

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

    if(!request.ok) {
       throw new Error('Error creating new Contact', newAd.message);
    };
    return newAd;
};

export {
    getAllAds,
    createAd,
}