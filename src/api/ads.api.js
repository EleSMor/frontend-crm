import { BASE_URL } from "./constants"
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
            'Content-Type': 'application/json'
        }
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

    if (!request.ok) {
        throw new Error('Error creating new Contact', updatedAd.message);
    };
    return updatedAd;
};

const uploadImage = async (id, form, from) => {
    const request = await fetch(`${adsURL}/upload/${from}/${id}`, {
        method: 'PUT',
        credentials: 'include',
        body: form,
    });

    const uploadedMain = await request.json();

    if (!request.ok) {
        throw new Error('Error creating new Contact', uploadedMain.message);
    };
    return uploadedMain;
};

const deleteImage = async (id, form, from) => {
    const request = await fetch(`${adsURL}/delete/${from}/${id}`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const deletedImage = await request.json();

    if (!request.ok) {
        throw new Error('Error creating new Contact', deletedImage.message);
    };
    return deletedImage;
};

const deleteAd = async (id) => {
    const request = await fetch(`${adsURL}/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const deletedAd = await request.json();

    if (!request.ok) {
        throw new Error('Error creating new Contact', deletedAd.message);
    };
    return deletedAd;
};

export {
    getAllAds,
    getAdById,
    createAd,
    updateAd,
    uploadImage,
    deleteImage,
    getMatchedRequests,
    deleteAd
}