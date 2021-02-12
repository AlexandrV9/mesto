import Card  from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';

import './index.css';

import {
  initialCards,
  cardListSelector,
  userParameters,
  profileAuthorNode,
  profileCaptionNode,
  profileImafeNode,
  profileAddButtonNode,
  profileEditButtonNode,
  profileInputNameNode,
  profileInputJobNode,
  validationConfig,
  elementInputCaptionNode,
  elementInputImageNode,
  esc
} from '../scripts/constants.js'

fetch('https://mesto.nomoreparties.co/v1/cohort-20/users/me',{
  headers: {
    authorization: 'c11cc168-18b7-47ef-9e2e-a935593ae9b6'
  }
})
.then(res => res.json())
.then((result) => {
  console.log(result);
  profileAuthorNode.textContent =  result.name;
  profileCaptionNode.textContent = result.about;
  profileImafeNode.style.backgroundImage = `url(${result.avatar})`;
});

fetch('https://mesto.nomoreparties.co/v1/cohort-20/cards ',{
  headers: {
    authorization: 'c11cc168-18b7-47ef-9e2e-a935593ae9b6'
  }
})
.then(res => res.json())
.then((result) => {
  const cardList = new Section({
    items: result,
    renderer:(cardItem) => {
      сreateCard(cardItem, cardList);
    }
    },cardListSelector
  );
  cardList.renderItems();
});





const popupImage = new PopupWithImage('.popup_type_image', elementInputImageNode, elementInputCaptionNode, esc);

const userInfo = new UserInfo(userParameters, profileInputNameNode, profileInputJobNode);

const checkformPopupProfileNode = new FormValidator(validationConfig, '.popup__form_type_profile');
const checkformPopupElementNode = new FormValidator(validationConfig, '.popup__form_type_element');

function сreateCard(cardItem, cardList) {
  const card = new Card(cardItem,'.template-card',{
    handleCardClick: (elementTitle, elementImage) => {
      popupImage.open(elementTitle, elementImage);
    }
   });
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

const popupProfile = new PopupWithForm('.popup_type_profile', {
  handleFormSubmit: ( data ) => {
    userInfo.setUserInfo(profileInputNameNode, profileInputJobNode);
    popupProfile.close();
  }
  }, esc
);

const popupElement = new PopupWithForm('.popup_type_element', {
  handleFormSubmit: ( data ) => {
    const inputText = data.Name;
    const inputLink = data.Link;
    cardList.renderer( {name: inputText, link: inputLink} );
    popupElement.close();
  }
  }, esc
);

function handleOpenPopupProfile(){
  popupProfile.open();
  userInfo.getUserInfo(profileInputNameNode, profileInputJobNode);
  checkformPopupProfileNode.resetValidityState();
}

function handleOpenPopupElement(){
  popupElement.open();
  checkformPopupElementNode.resetValidityState();
}

popupImage.setEventListeners();
popupElement.setEventListeners();
popupProfile.setEventListeners();

checkformPopupProfileNode.enableValidation();
checkformPopupElementNode.enableValidation();

profileEditButtonNode.addEventListener('click',handleOpenPopupProfile);
profileAddButtonNode.addEventListener('click',handleOpenPopupElement);
