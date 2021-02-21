export default class API {
  constructor(config){
    this._headers =  config.headers;
    this._url = config.url;
  }

  _serverResponse = (res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }


  getAllCards(){
    return fetch(`${this._url}cards`,{
      method: 'GET',
      headers: this._headers
    })
    .then(this._serverResponse)
  }

  getUserInfo(){
    return fetch(`${this._url}users/me`,{
      method: 'GET',
      headers: this._headers
    })
    .then(this._serverResponse)
  }

  addCard(data){
    return fetch(`${this._url}cards`,{
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._serverResponse)
  }

  deleteCard(id){
    return fetch(`${this._url}cards/${id}`,{
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._serverResponse)
  }

  editProfile(data){
    return fetch(`${this._url}users/me`,{
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._serverResponse)
  }

  addLike(cardId){
    return fetch(`${this._url}cards/likes/${cardId}`,{
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._serverResponse)
  }

  deleteLike(cardId){
    return fetch(`${this._url}cards/likes/${cardId}`,{
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._serverResponse)
  }

  updateAvatar(link){
    return fetch(`${this._url}users/me/avatar`,{
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: link })
    })
    .then(this._serverResponse)
  }
}


