export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }
  _getHeaders() {
    const token = localStorage.getItem('token');

    return {
      'Authorization': `Bearer ${token}`,
      ...this._headers,
    };
  }
  _checkResponce(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }
  
  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._getHeaders(),
    })
    .then((this._checkResponce)) 
  }
  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._getHeaders(),
      method: 'GET'
    })
    .then((this._checkResponce)) 
  }
  createCard(card){
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
    .then((this._checkResponce)) 
  }
  
  
    deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders()
    })
    .then((this._checkResponce)) 
  }
    editProfile(profile) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: profile.name,
        about: profile.about
      })
    })
    .then((this._checkResponce)) 
  }

  setLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._getHeaders()
    })
    .then((this._checkResponce)) 
  }

  removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
    .then((this._checkResponce)) 
  }
  setAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data.link
      })
    })
    .then((this._checkResponce)) 
  }
}
const api = new Api ({
  url: 'https://api.kachmaz.nomoredomainsmonster.ru',
  headers: {
    'Content-Type': 'application/json'
  }
})
export default api