class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._credentials = options.credentials;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(this._checkResponse);
  }

  getUserInfo() {
    return this._request("/users/me", {
      credentials: this._credentials,
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request("/cards", {
      credentials: this._credentials,
      headers: this._headers,
    });
  }

  editProfile({ name, about }) {
    return this._request("/users/me", {
      method: "PATCH",
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  addNewCard({ name, link }) {
    return this._request("/cards", {
      method: "POST",
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
      credentials: this._credentials,
      headers: this._headers,
    });
  }

  addNewAvatar({ avatar }) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return this._request(`/cards/${cardId}/likes`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      credentials: this._credentials,
      headers: this._headers,
    });
  }
}

// Создаём экземпляр класса Api
const api = new Api({
  baseUrl: "https://apii.mesto2023.students.nomoredomains.monster",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: 'include', // теперь куки посылаются вместе с запросом
});

export default api;
