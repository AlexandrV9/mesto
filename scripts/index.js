import { openPopup, сlosePopup, popupImageNode} from './utils.js';
import  Card  from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

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


const popupProfileNode = document.querySelector('.popup_type_profile');
const popupElementNode = document.querySelector('.popup_type_element');

const profileInputNameNode = popupProfileNode.querySelector('.popup__input_type_name');
const profileInputJobNode = popupProfileNode.querySelector('.popup__input_type_job');

const elementInputNameNode =  popupElementNode.querySelector('.popup__input_type_name');
const elementInputLinkNode = popupElementNode.querySelector('.popup__input_type_link');

const popupCloseButtonImageNode = popupImageNode.querySelector('.popup__close-button');

const popupProfile = new Popup('.popup_type_profile');
const popupElement = new Popup('.popup_type_element');
const PopupImage = new PopupWithImage('.popup_type_image');

PopupImage.setEventListeners();


const cardList = new Section({
  items: initialCards.reverse(),
  renderer:(cardItem) => {
    const card = new Card(cardItem,'.template-card',{
      handleCardClick: (elementTitle, elementImage) => {
        PopupImage.open(elementTitle, elementImage);
      }
     });
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

popupProfile.setEventListeners();
popupElement.setEventListeners();

function handleOpenPopupProfile(){
  popupProfile.open();
  profileInputNameNode.value = profileAuthorNode.textContent;
  profileInputJobNode.value = profileCaptionNode.textContent;
  checkformPopupProfileNode.resetValidityState();
}

function handleOpenPopupElement(){
  popupElement.open();
  const buttonResetPopupElementForm = popupElementNode.querySelector('.popup__form');
  buttonResetPopupElementForm.reset();
  checkformPopupElementNode.resetValidityState();
}

const popupProfileForm = new PopupWithForm('.popup_type_profile', {
  handleFormSubmit: () => {
    profileAuthorNode.textContent = profileInputNameNode.value;
    profileCaptionNode.textContent = profileInputJobNode.value;
    popupProfileForm.close();
  }
});

popupProfileForm.setEventListeners();

const popupElementForm = new PopupWithForm('.popup_type_element', {
  handleFormSubmit: () => {
    const inputText = elementInputNameNode.value;
    const inputLink = elementInputLinkNode.value;
    const newCard = new Section({
      items: [ {name: inputText, link: inputLink} ],
      renderer:(cardItem) => {
        const card = new Card(cardItem,'.template-card',{
          handleCardClick: (elementTitle, elementImage) => {
            PopupImage.open(elementTitle,elementImage);
          }
         });
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
      }
      },cardListSelector
    );
    newCard.renderItems();
    popupElementForm.close();
  }
  }
);

popupElementForm.setEventListeners();

function handleClosePopupByOverlay(popup){
  return (event) => {
    if (event.target === event.currentTarget) {
      сlosePopup(popup);
    };
  }
}

profileEditButtonNode.addEventListener('click',handleOpenPopupProfile);
profileAddButtonNode.addEventListener('click',handleOpenPopupElement);

popupProfileNode.addEventListener('click', handleClosePopupByOverlay(popupProfileNode));
popupElementNode.addEventListener('click', handleClosePopupByOverlay(popupElementNode));
popupImageNode.addEventListener('click', handleClosePopupByOverlay(popupImageNode));
