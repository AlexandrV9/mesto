const popupNode = document.querySelector('.popup');
const popupFormNode = document.querySelector('.popup__form');
const popupInputNameNode = document.querySelector('.popup__input-name');
const popupInputJobNode = document.querySelector('.popup__input-job');
const popupCloseButtonNode = document.querySelector('.popup__close-button');
const profileEditButtonNode = document.querySelector('.profile__edit-button');


const profileAuthorNode = document.querySelector('.profile__author');
const profileCaptionNode = document.querySelector('.profile__caption');

profileEditButtonNode.addEventListener('click',handleAddPopupVisibility);
popupCloseButtonNode.addEventListener('click',handleClearForm);
popupFormNode.addEventListener('submit', handleFormSubmit);

function handleAddPopupVisibility(){
  popupNode.classList.add('popup_visible');
 }

function handleFormSubmit(event){
  event.preventDefault();
  profileAuthorNode.textContent = popupInputNameNode.value;
  profileCaptionNode.textContent = popupInputJobNode.value;
  popupNode.classList.remove('popup_visible');
}

function handleClearForm(){
  popupNode.classList.remove('popup_visible');
  popupInputNameNode.value = profileAuthorNode.textContent;
  popupInputJobNode.value = profileCaptionNode.textContent;
}

const elementsButtonLikeNode = document.querySelector('.elements__button-like');
const elementsUnorderedListNode = document.querySelector('.elements__unordered-list');

elementsUnorderedListNode.addEventListener('click', handleElementsButtonLikeActive);

function handleElementsButtonLikeActive(event){
  if (event.target.classList.contains('elements__button-like')) {
    event.target.classList.toggle("elements__button-like_active");
  }
}
