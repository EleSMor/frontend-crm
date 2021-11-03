const BASE_URL = "http://localhost:3500";
const registerUrl = `${BASE_URL}/auth/register`;
const loginUrl = `${BASE_URL}/auth/login`;
const logoutUrl = `${BASE_URL}/auth/logout`;

export const registerApi = async (form) => {
  console.log(form)
  const request = await fetch(registerUrl, {
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

export const loginApi = async (form) => {
  const request = await fetch(loginUrl, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(form),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const response = await request.json();

  if (!request.ok) {
    throw new Error("Error en la petición", response.message);
  }

  return response

};

export const logout = async () => {
  const request = await fetch(logoutUrl, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    credentials: 'include',
  });

  const response = await request.json();

  if (!request.ok) {
    throw new Error(response.message);
  }

  return response;
}