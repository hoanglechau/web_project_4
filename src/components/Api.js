class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} ${res.statusText}`),
      )
      .catch((err) => console.log(err));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} ${res.statusText}`),
      )
      .catch((err) => console.log(err));
  }

  getInitialCards() {
    return Promise.all([this.getCardList(), this.getUserInfo()]);
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} ${res.statusText}`),
      )
      .catch((err) => console.log(err));
  }

  removeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} ${res.statusText}`),
      )
      .catch((err) => console.log(err));
  }

  addLike(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} ${res.statusText}`),
      )
      .catch((err) => console.log(err));
  }

  removeLike(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} ${res.statusText}`),
      )
      .catch((err) => console.log(err));
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} ${res.statusText}`),
      )
      .catch((err) => Promise.reject(err));
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} ${res.statusText}`),
      )
      .catch((err) => console.log(err));
  }
}

const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-12',
  headers: {
    authorization: '1789319c-7844-4c96-ac53-65a440060c1a',
    'Content-Type': 'application/json',
  },
});

export default api;
