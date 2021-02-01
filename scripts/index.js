import { сlosePopup, popupImageNode} from './utils.js';
import  Card  from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

import {
  initialCards,
  cardListSelector,
  profileAddButtonNode,
  profileEditButtonNode,
  userParameters,
  profileAuthorNode
} from './constants.js'

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputInvalidClass: 'popup__input_state_invalid',
  buttonInvalidClass: 'popup__button_invalid'
};

const popupProfileNode = document.querySelector('.popup_type_profile');
const popupElementNode = document.querySelector('.popup_type_element');

const elementInputNameNode =  popupElementNode.querySelector('.popup__input_type_name');
const elementInputLinkNode = popupElementNode.querySelector('.popup__input_type_link');

const popupProfile = new Popup('.popup_type_profile');
const popupElement = new Popup('.popup_type_element');
const popupImage = new PopupWithImage('.popup_type_image');

popupProfile.setEventListeners();
popupElement.setEventListeners();
popupImage.setEventListeners();


const cardList = new Section({
  items: initialCards.reverse(),
  renderer:(cardItem) => {
    const card = new Card(cardItem,'.template-card',{
      handleCardClick: (elementTitle, elementImage) => {
        popupImage.open(elementTitle, elementImage);
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



const userInfo = new UserInfo(userParameters);

function handleOpenPopupProfile(){
  popupProfile.open();
  userInfo.getUserInfo();
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
    userInfo.setUserInfo();
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
            popupImage.open(elementTitle,elementImage);
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
