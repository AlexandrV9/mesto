import Popup from './Popup.js';
import {
  profileAuthorNode,
  profileCaptionNode,
  profileInputNameNode,
  profileInputJobNode
} from './constants.js'
export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }){
    super(popupSelector); // в конструктор колбэк сабмита формы
    this.handleFormSubmit = handleFormSubmit;
  }
  _getInputValues(){
    // собирает данные всех полей формы
  }
  setEventListeners(){
    super.setEventListeners();
    this._popup.addEventListener('submit', () => {this.handleFormSubmit()});
    // должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы
  }
  close(){
    super.close();

    // при закрытии попапа форма должна ещё и сбрасываться
  }
  // Для каждого попапа создавайте свой экземпляр класса PopupWithForm
}
