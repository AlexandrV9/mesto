export default class API {
  constructor(config){
    this._headers =  config.headers;
    this._url = config.url;
  }

  getAllCards(){
    return fetch(`${this._url}cards`,{
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      if(res.ok){
      return res.json();
      }
      else{
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }

  getUserInfo(){
    return fetch(`${this._url}users/me`,{
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      else{
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }

  addCard(data){
    return fetch(`${this._url}cards`,{
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      else{
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }

  deleteCard(id){
    return fetch(`${this._url}cards/${id}`,{
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      else{
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }

  editProfile(data){
    return fetch(`${this._url}users/me`,{
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      else{
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }

  addLike(cardId){
    return fetch(`${this._url}cards/likes/${cardId}`,{
      method: 'PUT',
      headers: this._headers,
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      else{
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }

  deleteLike(cardId){
    return fetch(`${this._url}cards/likes/${cardId}`,{
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      else{
        return Promise.reject(`Ошибка: ${res.status}`);

      }
    })
  }

  updateAvatar(link){
    return fetch(`${this._url}users/me/avatar`,{
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: link })
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      else{
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }
}


