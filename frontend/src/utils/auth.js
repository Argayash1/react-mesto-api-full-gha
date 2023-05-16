export const BASE_URL = "https://apii.mesto2023.students.nomoredomains.monster";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    return Promise.reject(`Ошибка ${res.status}: ${err.message || err.error}`);
  });
};

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    return checkResponse(res);
  });
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include', // теперь куки посылаются вместе с запросом
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    return checkResponse(res);
  });
};

export const signout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "GET",
    credentials: 'include', // теперь куки посылаются вместе с запросом
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    })
    .then((res) => {
    return checkResponse(res);
});
}

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include', // теперь куки посылаются вместе с запросом
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};
