import { BASE_URL } from "./constants"
const imagesURL = `${BASE_URL}/images`;

const deleteImage = async (form) => {
    const request = await fetch(`${imagesURL}/delete`, {
        method: 'POST',
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

export { deleteImage }