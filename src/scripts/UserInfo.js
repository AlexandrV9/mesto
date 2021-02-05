export default class UserInfo {
  constructor(data){
    this._nameUser = document.querySelector(data.nameUserSelector);
    this._descriptionUser = document.querySelector(data.descriptionUserSelector);
  }

  getUserInfo(profileInputNameNode, profileInputJobNode){
    profileInputNameNode.value = this._nameUser.textContent;
    profileInputJobNode.value = this._descriptionUser.textContent;

    return {
      profileInputNameValue: profileInputNameNode.value,
      profileInputJobValue: profileInputJobNode.value
    }
  }

  setUserInfo(profileInputNameNode, profileInputJobNode){
    this._nameUser.textContent = profileInputNameNode.value;
    this._descriptionUser.textContent = profileInputJobNode.value;
  }
}
