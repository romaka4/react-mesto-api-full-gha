export const BASE_URL = 'http://localhost:3005'

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email }),
    mode: "no-cors",
  })
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((res) => {
    if (!res.error) {
    return res;
    } else {
      console.log(res.error);
    }
  })
  .catch((err) => {
    console.log(`${err}`);
  });
};
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((response => response.json())) 
  .then((res) => {
    if (res.token) {
    return res;
    } else {
      console.log(res.message);
    }
  })
  .catch((err) => {
    console.log(`${err}`);
  });
};
export function checkToken (token) {
  console.log(token);
  console.log(BASE_URL);
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err));
}