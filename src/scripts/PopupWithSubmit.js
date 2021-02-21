import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, esc, { handleCardDelete }){
    super(popupSelector, esc);
    this._popupDeleteButton = this._popup.querySelector('.popup__input-submit-button');
    this._handleCardDelete = handleCardDelete;
  }

  open(currentCard, currentItem){
    super.open();
    this._currentCard = currentCard;
    this._IdCard = currentItem;
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupDeleteButton.addEventListener('click', () => {
      this._handleCardDelete(this._IdCard, this._currentCard, this._textButtonSubmit);
    });
  }

}
