import Card  from './Card.js';
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
  validationConfig,
  elementInputNameNode,
  elementInputLinkNode
} from './constants.js'

const popupProfile = new Popup('.popup_type_profile');
const popupElement = new Popup('.popup_type_element');
const popupImage = new PopupWithImage('.popup_type_image');

const userInfo = new UserInfo(userParameters);

const checkformPopupProfileNode = new FormValidator(validationConfig, '.popup__form_type_profile');
const checkformPopupElementNode = new FormValidator(validationConfig, '.popup__form_type_element');

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

function handleOpenPopupProfile(){
  popupProfile.open();
  userInfo.getUserInfo();
  checkformPopupProfileNode.resetValidityState();
}

function handleOpenPopupElement(){
  popupElement.open();
  checkformPopupElementNode.resetValidityState();
}

const popupProfileForm = new PopupWithForm('.popup_type_profile', {
  handleFormSubmit: () => {
    userInfo.setUserInfo();
    popupProfileForm.close();
  }
});

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

popupProfile.setEventListeners();
popupElement.setEventListeners();
popupImage.setEventListeners();

popupElementForm.setEventListeners();
popupProfileForm.setEventListeners();

checkformPopupProfileNode.enableValidation();
checkformPopupElementNode.enableValidation();

profileEditButtonNode.addEventListener('click',handleOpenPopupProfile);
profileAddButtonNode.addEventListener('click',handleOpenPopupElement);
