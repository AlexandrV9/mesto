import { openPopup, сlosePopup, popupImageNode} from './utils.js';
import  Card  from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';

import {
  initialCards,
  cardListSelector,
  profileAddButtonNode,
  profileEditButtonNode
} from './constants.js'

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputInvalidClass: 'popup__input_state_invalid',
  buttonInvalidClass: 'popup__button_invalid'
};



const profileAuthorNode = document.querySelector('.profile__author');
const profileCaptionNode = document.querySelector('.profile__caption');



const listContainerElement = document.querySelector('.elements');

const popupProfileNode = document.querySelector('.popup_type_profile');
const popupElementNode = document.querySelector('.popup_type_element');

const profileInputNameNode = popupProfileNode.querySelector('.popup__input_type_name');
const profileInputJobNode = popupProfileNode.querySelector('.popup__input_type_job');

const elementInputNameNode =  popupElementNode.querySelector('.popup__input_type_name');
const elementInputLinkNode = popupElementNode.querySelector('.popup__input_type_link');

// const popupCloseButtonProfileNode = popupProfileNode.querySelector('.popup__close-button');
// const popupCloseButtonElementNode = popupElementNode.querySelector('.popup__close-button');
const popupCloseButtonImageNode = popupImageNode.querySelector('.popup__close-button');

const cardList = new Section({
  items: initialCards.reverse(),
  renderer:(cardItem) => {
    const card = new Card(cardItem,'.template-card');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
  },cardListSelector
);

cardList.renderItems();

const checkformPopupProfileNode = new FormValidator(validationConfig, '.popup__form_type_profile');
const checkformPopupElementNode = new FormValidator(validationConfig, '.popup__form_type_element');

checkformPopupProfileNode.enableValidation();
checkformPopupElementNode.enableValidation();

const popupProfile = new Popup('.popup_type_profile');
const popupElement = new Popup('.popup_type_element');



popupProfile.setEventListeners();
popupElement.setEventListeners();

function handleOpenPopupProfile(){
  popupProfile.open();
  // openPopup(popupProfileNode);
  profileInputNameNode.value = profileAuthorNode.textContent;
  profileInputJobNode.value = profileCaptionNode.textContent;
  checkformPopupProfileNode.resetValidityState();
}

function handleOpenPopupElement(){
  popupElement.open();
  // openPopup(popupElementNode);
  const buttonResetPopupElementForm = popupElementNode.querySelector('.popup__form');
  buttonResetPopupElementForm.reset();
  checkformPopupElementNode.resetValidityState();
}

function handleAddNewElement(){
  const inputText = elementInputNameNode.value;
  const inputLink = elementInputLinkNode.value;
  const newCard = new Section({
    items: [ {name: inputText, link: inputLink} ],
    renderer:(cardItem) => {
      const card = new Card(cardItem,'.template-card');
      const cardElement = card.generateCard();
      newCard.addItem(cardElement);
    }
    },cardListSelector
  );
  newCard.renderItems();
}

function handleProfileFormSubmit(){
  profileAuthorNode.textContent = profileInputNameNode.value;
  profileCaptionNode.textContent = profileInputJobNode.value;
  popupProfile.close();
  // сlosePopup(popupProfileNode);
 }

function handleAddElementFormSubmit(){
  handleAddNewElement();
  popupElement.close();
  // сlosePopup(popupElementNode);
}

function handleClosePopupByOverlay(popup){
  return (event) => {
    if (event.target === event.currentTarget) {
      сlosePopup(popup);
    };
  }
}

// popupCloseButtonProfileNode.addEventListener('click',() => {сlosePopup(popupProfileNode)});
// popupCloseButtonElementNode.addEventListener('click',() => {сlosePopup(popupElementNode)});
popupCloseButtonImageNode.addEventListener('click',() => {сlosePopup(popupImageNode)});

profileEditButtonNode.addEventListener('click',handleOpenPopupProfile);
profileAddButtonNode.addEventListener('click',handleOpenPopupElement);

popupProfileNode.addEventListener('submit',  handleProfileFormSubmit);
popupElementNode.addEventListener('submit', handleAddElementFormSubmit);

popupProfileNode.addEventListener('click', handleClosePopupByOverlay(popupProfileNode));
popupElementNode.addEventListener('click', handleClosePopupByOverlay(popupElementNode));
popupImageNode.addEventListener('click', handleClosePopupByOverlay(popupImageNode));
