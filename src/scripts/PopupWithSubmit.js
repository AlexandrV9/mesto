import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, esc, api){
    super(popupSelector, esc);
    this._popupDeleteButton = this._popup.querySelector('.popup__input-submit-button');
    this._api = api;
  }

  _handleCardDelete(){
    this._api
      .deleteCard(this._IdCard)
      .then(() => {
        this._currentCard.remove();
        this._currentCard = '';
      })
      .catch((err) => {
        console.log(err);
      })

  }

  open(currentCard, currentItem){
    super.open();
    this._currentCard = currentCard;
    this._IdCard = currentItem;
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupDeleteButton.addEventListener('click', () => {
      this._handleCardDelete();
      this.close();
    });
  }
}
