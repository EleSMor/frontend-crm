import { BASE_URL } from "./constants"

const mails = `${BASE_URL}/mails`;

export const sendAdsToContact = async (form) => {
  const request = await fetch(`${mails}/sendAdsToContact`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(form),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })

  const response = await request.json();

  if (!request.ok) {

    throw new Error('Error en la peticion', response.message)
  }
  return response;
}

export const sendAdToContacts = async (form) => {
  const request = await fetch(`${mails}/sendAdToContacts`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(form),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })

  const response = await request.json();

  if (!request.ok) {

    throw new Error('Error en la peticion', response.message)
  }
  return response;
}