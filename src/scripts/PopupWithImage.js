import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, elementInputImageNode, elementInputCaptionNode, esc){
    super(popupSelector, esc);
    this._elementInputImageNode = elementInputImageNode;
    this._elementInputCaptionNode = elementInputCaptionNode;
  }

  open(elementTitle, elementImage){
    super.open();
    this._elementInputCaptionNode.textContent = elementTitle.textContent;
    this._elementInputImageNode.src = elementImage.src;
    this._elementInputImageNode.alt = elementTitle.textContent;
  }

  close(){
    super.close();
  }
}
