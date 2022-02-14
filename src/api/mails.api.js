import { BASE_URL } from "./constants"

const sendEmail = `${BASE_URL}/mails/sendEmail`;

export const sendAdsApi = async (form) => {
  const request = await fetch(sendEmail, {
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