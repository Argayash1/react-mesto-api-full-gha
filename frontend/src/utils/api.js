class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Огромное Вам спасибо за этот метод, с большим интересом разобрался и использовал его!
  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(this._checkResponse);
  }

  getUserInfo() {
    return this._request("/users/me", {
      credentials: 'include', // теперь куки посылаются вместе с запросом
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request("/cards", {
      credentials: 'include', // теперь куки посылаются вместе с запросом
      headers: this._headers,
    });
  }

  editProfile({ name, about }) {
    return this._request("/users/me", {
      method: "PATCH",
      credentials: 'include', // теперь куки посылаются вместе с запросом
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
      credentials: 'include', // теперь куки посылаются вместе с запросом
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
      credentials: 'include', // теперь куки посылаются вместе с запросом
      headers: this._headers,
    });
  }

  addNewAvatar({ avatar }) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      credentials: 'include', // теперь куки посылаются вместе с запросом
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return this._request(`/cards/${cardId}/likes`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      credentials: 'include', // теперь куки посылаются вместе с запросом
      headers: this._headers,
    });
  }
}

// Создаём экземпляр класса Api
const api = new Api({
  baseUrl: "https://apii.mesto2023.students.nomoredomains.monster",
  headers: {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDVkM2FmNGQyOTg4OWMyMDQ3ZjJmM2UiLCJpYXQiOjE2ODM4NzUzNzQsImV4cCI6MTY4NDQ4MDE3NH0.uluiRlHMziNsU1rbOFd2YiM4iZlPVKDQd8n9Lootcts",
    "Content-Type": "application/json",
  },
});

export default api;
