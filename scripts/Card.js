import { openPopup, popupImageNode, elementInputImageNode, elementInputCaptionNode } from './utils.js';

export default class Card{

  constructor(data, cardSelector, { handleCardClick }){
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
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
    this._elementButtonDelete.addEventListener('click', () => {this._handleElementButtonDelete();
    });
    this._elementButtonLike.addEventListener('click', () => {this._handleElementButtonLikeActive();
    });
    // this._elementImage.addEventListener('click',() => {this._handleOpenPopupImage();
    // });

    this._elementImage.addEventListener('click',() => {this.handleCardClick(this._elementTitle, this._elementImage);
    });
  }

  _handleElementButtonDelete(){
    this._element.remove();
    this._element = '';
  }

  _handleElementButtonLikeActive(){
    this._elementButtonLike.classList.toggle('element__button-like_active');
  }

  // _handleOpenPopupImage(){
  //   openPopup(popupImageNode);
  //   elementInputImageNode.src = this._elementImage.src;
  //   elementInputCaptionNode.textContent = this._elementTitle.textContent;
  //   elementInputImageNode.alt = this._elementTitle.textContent;
  // }

  generateCard(){
    this._element = this._getTemplate();
    // Все переменные ниже будут доступны и в других методах.
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementButtonDelete = this._element.querySelector('.element__button-delete');
    this._elementButtonLike = this._element.querySelector('.element__button-like');

    this._setEventListener();

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;

    return this._element;
  }
}
