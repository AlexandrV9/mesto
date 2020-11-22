const profileEditButtonNode = document.querySelector('.profile__edit-button');
const popupCloseButtonNode = document.querySelector('.popup__close-button');
const popupNode = document.querySelector('.popup');

const profileAuthorNode = document.querySelector('.profile__author');
const profileCaptionNode = document.querySelector('.profile__caption');

const popupFormNode = document.querySelector('.popup__form');

const popupInputNameNode = document.querySelector('.popup__input-name');
const popupInputJobNode = document.querySelector('.popup__input-job');

profileEditButtonNode.addEventListener('click',togglePopupVisibility);
popupCloseButtonNode.addEventListener('click',togglePopupVisibility);

function togglePopupVisibility(){
  popupNode.classList.toggle('popup_visible');
}

popupFormNode.addEventListener('submit', handleFormSubmit)

function handleFormSubmit(event){
  event.preventDefault();
  profileAuthorNode.textContent = popupInputNameNode.value;
  profileCaptionNode.textContent = popupInputJobNode.value;
}
