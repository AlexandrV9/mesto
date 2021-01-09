import  Card  from './Card.js';
import FormValidator from './FormValidator.js';

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputInvalidClass: 'popup__input_state_invalid',
  buttonInvalidClass: 'popup__button_invalid'
};

const profileAuthorNode = document.querySelector('.profile__author');
const profileCaptionNode = document.querySelector('.profile__caption');
const profileEditButtonNode = document.querySelector('.profile__edit-button');
const profileAddButtonNode = document.querySelector('.profile__add-button');

const listContainerElement = document.querySelector('.elements');

const popupProfileNode = document.querySelector('.popup_type_profile');
const popupElementNode = document.querySelector('.popup_type_element');
export const popupImageNode = document.querySelector('.popup_type_image');

const profileInputNameNode = popupProfileNode.querySelector('.popup__input_type_name');
const profileInputJobNode = popupProfileNode.querySelector('.popup__input_type_job');

const elementInputNameNode =  popupElementNode.querySelector('.popup__input_type_name');
const elementInputLinkNode = popupElementNode.querySelector('.popup__input_type_link');
export const elementInputImageNode = popupImageNode.querySelector('.popup__image');
export const elementInputCaptionNode = popupImageNode.querySelector('.popup__caption');

const popupCloseButtonProfileNode = popupProfileNode.querySelector('.popup__close-button');
const popupCloseButtonElementNode = popupElementNode.querySelector('.popup__close-button');
const popupCloseButtonImageNode = popupImageNode.querySelector('.popup__close-button');

initialCards.forEach((item) => {
  const card = new Card(item,'.template-card');
  const cardElement = card.generateCard();
  listContainerElement.append(cardElement);
});

export function openPopup(popup){
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', handleClosePopupByEscButton);
}

function сlosePopup(popup){
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', handleClosePopupByEscButton);
}

const checkformPopupProfileNode = new FormValidator(validationConfig, '.popup__form_type_profile');
const checkformPopupElementNode = new FormValidator(validationConfig, '.popup__form_type_element');

checkformPopupProfileNode.enableValidation();
checkformPopupElementNode.enableValidation();


function handleOpenPopupProfile(){
  openPopup(popupProfileNode);
  profileInputNameNode.value = profileAuthorNode.textContent;
  profileInputJobNode.value = profileCaptionNode.textContent;
  checkformPopupProfileNode.resetValidityState();
}

function handleOpenPopupElement(){
  openPopup(popupElementNode);
  const buttonResetPopupElementForm = popupElementNode.querySelector('.popup__form');
  buttonResetPopupElementForm.reset();
  checkformPopupElementNode.resetValidityState();
}

function handleAddNewElement(){
  const inputText = elementInputNameNode.value;
  const inputLink = elementInputLinkNode.value;
  const newCard = new Card({name: inputText, link: inputLink},'.template-card');
  const newCardElement = newCard.generateCard();
  listContainerElement.prepend(newCardElement);
}

function handleProfileFormSubmit(){
  profileAuthorNode.textContent = profileInputNameNode.value;
  profileCaptionNode.textContent = profileInputJobNode.value;
  сlosePopup(popupProfileNode);
 }

function handleAddElementFormSubmit(){
  handleAddNewElement();
  сlosePopup(popupElementNode);
}

function handleClosePopupByOverlay(popup){
  return (event) => {
    if (event.target === event.currentTarget) {
      сlosePopup(popup);
    };
  }
}

const handleClosePopupByEscButton = (event) => {
  if (event.key === 'Escape') {
    const currentOpenPopup = document.querySelector('.popup_visible');
    сlosePopup(currentOpenPopup);
  }
  return;
}

popupCloseButtonProfileNode.addEventListener('click',() => {сlosePopup(popupProfileNode)});
popupCloseButtonElementNode.addEventListener('click',() => {сlosePopup(popupElementNode)});
popupCloseButtonImageNode.addEventListener('click',() => {сlosePopup(popupImageNode)});

profileEditButtonNode.addEventListener('click',handleOpenPopupProfile);
profileAddButtonNode.addEventListener('click',handleOpenPopupElement);

popupProfileNode.addEventListener('submit',  handleProfileFormSubmit);
popupElementNode.addEventListener('submit', handleAddElementFormSubmit);

popupProfileNode.addEventListener('click', handleClosePopupByOverlay(popupProfileNode));
popupElementNode.addEventListener('click', handleClosePopupByOverlay(popupElementNode));
popupImageNode.addEventListener('click', handleClosePopupByOverlay(popupImageNode));
