import Popup from './Popup.js';
import {
  elementInputImageNode,
  elementInputCaptionNode
} from './constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
  }

  open(elementTitle, elementImage){
    super.open();
    elementInputCaptionNode.textContent = elementTitle.textContent;
    elementInputImageNode.src = elementImage.src;
    elementInputImageNode.alt = elementTitle.textContent;
  }

  close(){
    super.close();
  }

}
