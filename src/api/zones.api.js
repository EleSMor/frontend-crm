import { BASE_URL } from "./constants"
const zonesURL = `${BASE_URL}/zones`;

const getAllResidentialZones = async () => {
    const request = await fetch(`${zonesURL}/residentials`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const allResidentialZones = await request.json();
    if(!request.ok) {
       throw new Error('Error on fetch', allResidentialZones.message);
    };
    return allResidentialZones;
};

const getAllPatrimonialZones = async () => {
    const request = await fetch(`${zonesURL}/patrimonials`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const allPatrimonialZones = await request.json();
    if(!request.ok) {
       throw new Error('Error on fetch', allPatrimonialZones.message);
    };
    return allPatrimonialZones;
};

export {
    getAllResidentialZones,
    getAllPatrimonialZones,
}