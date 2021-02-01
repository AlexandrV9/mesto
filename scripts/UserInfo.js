import {
  profileInputNameNode,
  profileInputJobNode,
} from './constants.js';

export default class UserInfo {
  constructor(data){
    this._nameUser = document.querySelector(data.nameUserSelector);
    this._descriptionUser = document.querySelector(data.descriptionUserSelector);
  }
  getUserInfo(){
    profileInputNameNode.value = this._nameUser.textContent;
    profileInputJobNode.value = this._descriptionUser.textContent;
  }

  setUserInfo(){
    this._nameUser.textContent = profileInputNameNode.value;
    this._descriptionUser.textContent = profileInputJobNode.value;
  }
}
