let popupNode = document.querySelector('.popup');
let popupFormNode = document.querySelector('.popup__form');
let popupInputNameNode = document.querySelector('.popup__input_type_name');
let popupInputJobNode = document.querySelector('.popup__input_type_job');
let popupCloseButtonNode = document.querySelector('.popup__close-button');
let profileEditButtonNode = document.querySelector('.profile__edit-button');


let profileAuthorNode = document.querySelector('.profile__author');
let profileCaptionNode = document.querySelector('.profile__caption');


function handleAddPopupVisibility(){
  popupNode.classList.add('popup_visible');
  popupInputNameNode.value = profileAuthorNode.textContent;
  popupInputJobNode.value = profileCaptionNode.textContent;
 }

function handleFormSubmit(event){
  event.preventDefault();
  profileAuthorNode.textContent = popupInputNameNode.value;
  profileCaptionNode.textContent = popupInputJobNode.value;
  handleClearForm();
}

function handleClearForm(){
  popupNode.classList.remove('popup_visible');

}

profileEditButtonNode.addEventListener('click',handleAddPopupVisibility);
popupCloseButtonNode.addEventListener('click',handleClearForm);
popupFormNode.addEventListener('submit', handleFormSubmit);
