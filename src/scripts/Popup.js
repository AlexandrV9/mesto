export default class Popup {
  constructor(popupSelector, esc){
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
    this.esc = esc;
  }
  open(){
    this._popup.classList.add('popup_visible');
    document.addEventListener('keydown',  this._handleEscClose);
    this._popup.addEventListener('click', this._handleClosePopupByOverlay);
  }
  close(){
    this._popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleClosePopupByOverlay);
  }
  _handleEscClose = (event) => {
    if (event.key === this.esc) {
      this.close();
    }
  }
  _handleClosePopupByOverlay = (event) => {
    if (event.target === event.currentTarget) {
      this.close();
    };
  }
  setEventListeners(){
    this._popupCloseButton.addEventListener('click', () => { this.close() });
  }
}
