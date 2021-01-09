import { openPopup, popupImageNode, elementInputImageNode, elementInputCaptionNode } from './index.js';

export default class Card{

  constructor(data, cardSelector){
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate(){
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  _setEventListener(){
    this._element.querySelector('.element__button-delete').addEventListener('click', () => {this._handleElementButtonDelete();
    });
    this._element.querySelector('.element__button-like').addEventListener('click', () => {this._handleElementButtonLikeActive();
    });
    this._element.querySelector('.element__image').addEventListener('click',() => {this._handleOpenPopupImage();
    });
  }

  _handleElementButtonDelete(){
    this._element.remove();
  }

  _handleElementButtonLikeActive(){
    this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active');
  }

  _handleOpenPopupImage(){
    openPopup(popupImageNode);
    elementInputImageNode.src = this._element.querySelector('.element__image').src;
    elementInputCaptionNode.textContent = this._element.querySelector('.element__title').textContent;
    elementInputImageNode.alt = this._element.querySelector('.element__title').textContent;
  }

  generateCard(){
    this._element = this._getTemplate();
    this._setEventListener();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }

}
