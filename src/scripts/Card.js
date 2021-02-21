export default class Card{
  constructor(data, cardSelector, myId, { handleCardClick, handleDeleteClick, handleElementButtonLikeActive}){
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._anotherId = data.owner._id;
    this._cardId = data._id;
    this._myId = myId;
    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleElementButtonLikeActive = handleElementButtonLikeActive;
  }

  _сompareOwner(){
    if(this._myId !== this._anotherId){
      this._elementButtonDelete.remove();
    }
  }

  _getTemplate(){
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  isLike = () => {
    return this._likes.some((like) => {
      return (this._myId === like._id);
    });
  }

  _setEventListener(){
    this._elementButtonDelete.addEventListener('click', () => {this._handleDeleteClick(this._element);
    });
    this._elementButtonLike.addEventListener('click', () => {this._handleElementButtonLikeActive(this._cardId, this.isLike, this._handleAddLikeClick, this._handleDeleteLikeClick);
    });
    this._elementImage.addEventListener('click',() => {this._handleCardClick(this._elementTitle, this._elementImage);
    });
  }

  _handleAddLikeClick = (res) => {
    this._numberOfElementLikes.textContent = res.likes.length;
    this._likes = res.likes;
    this._elementButtonLike.classList.remove('element__button-like_active');
  }

  _handleDeleteLikeClick = (res) => {
    this._numberOfElementLikes.textContent = res.likes.length;
    this._likes = res.likes;
    this._elementButtonLike.classList.add('element__button-like_active');
  }

  _handleAddStartLikeOnPage(){
    if(this.isLike()){
      this._elementButtonLike.classList.add('element__button-like_active');
    }
    else{
      this._elementButtonLike.classList.remove('element__button-like_active');
    }
  }

  generateCard(){
    this._element = this._getTemplate();
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementImage = this._element.querySelector('.element__image');
    this._numberOfElementLikes = this._element.querySelector('.element__number-of-likes');

    this._elementButtonDelete = this._element.querySelector('.element__button-delete');
    this._elementButtonLike = this._element.querySelector('.element__button-like');

    this._сompareOwner();
    this._setEventListener();
    this._handleAddStartLikeOnPage();

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._numberOfElementLikes.textContent = this._likes.length;

    return this._element;
  }

}
