import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }){
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this.popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }
  _getInputValues(){
    const data = {};
    this._inputList.forEach((item) => {
      data[item.name] = item.value;
    });
    return data;
  }
  setEventListeners(){
    super.setEventListeners();
    this._popup.addEventListener('submit', () => {this.handleFormSubmit()});
  }
  close(){
    super.close();
    this.popupForm.reset();
  }
}
