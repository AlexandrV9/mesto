import {
  profileAddButtonNode,
  esc
 } from './constants.js';

export default class Popup {
  constructor(popupSelector){
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
  }
  open(){
    this._popup.classList.add('popup_visible');
    console.log();
    document.addEventListener('keydown', this._handleEscClose );
  }
  close(){
    this._popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose = (event) => {
    if (event.key === esc) {
      this.close();
    }
  }
  setEventListeners(){
    this._popupCloseButton.addEventListener('click', () => { this.close() });
    // document.removeEventListener('keydown', () => { this._handleEscClose() });
  }
}

