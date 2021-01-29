import Popup from './Popup.js';
import { elementInputImageNode, elementInputCaptionNode } from './utils.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    // this._elementTitle = elementTitle;
    // this._elementImage = elementImage;
  }
  open(elementTitle, elementImage){
    super.open();
    elementInputImageNode.src = elementImage.src;
    elementInputCaptionNode.textContent = elementTitle.textContent;
    elementInputImageNode.alt = elementTitle.textContent;
  }

}
