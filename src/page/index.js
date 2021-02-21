import Card  from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import PopupWithSubmit from '../scripts/PopupWithSubmit.js';
import API from '../scripts/API.js';

import './index.css';

import {
  validationConfig,
  apiConfig,
  cardListSelector,
  userParameters,
  profileAuthorNode,
  profileCaptionNode,
  profileImafeNode,
  profileEditAvatarButtonNode,
  profileAddButtonNode,
  profileEditButtonNode,
  profileInputNameNode,
  profileInputJobNode,
  elementInputCaptionNode,
  elementInputImageNode,
  esc,
  loadingText
} from '../scripts/constants.js'

const checkformPopupProfileNode = new FormValidator(validationConfig, '.popup__form_type_profile');
const checkformPopupElementNode = new FormValidator(validationConfig, '.popup__form_type_element');
const checkformPopupAvatarNode = new FormValidator(validationConfig, '.popup__form_type_avatar');

const api = new API(apiConfig);

const popupWithSubmit = new PopupWithSubmit('.popup_type_confirmation-сard-delete', esc, api);
const popupImage = new PopupWithImage('.popup_type_image', elementInputImageNode, elementInputCaptionNode, esc);

const userInfo = new UserInfo(userParameters, profileInputNameNode, profileInputJobNode);

let myId;

popupWithSubmit.setEventListeners();


api
  .getUserInfo()
  .then((data) => {
    myId = data._id;
    profileImafeNode.style.backgroundImage = `url(${data.avatar})`;
    profileAuthorNode.textContent =  data.name;
    profileCaptionNode.textContent = data.about;
    profileImafeNode.style.backgroundImage = `url(${data.avatar})`;
  })
  .catch((err) => {`
  Ошибка ${err}`
});

api
  .getAllCards()
  .then((data) => {
    cardList.renderItems(data.reverse());
  })
  .catch((err) => {
  `Ошибка ${err}`
});

function сreateCard(cardItem) {
  const card = new Card(cardItem,'.template-card', myId, api, {
    handleCardClick: (elementTitle, elementImage) => {
      popupImage.open(elementTitle, elementImage);
    },
    handleDeleteClick: (currentCard) =>{
      popupWithSubmit.open(currentCard, cardItem._id)
    },
  });
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

const cardList = new Section({
  renderer:(cardItem) => {
    сreateCard(cardItem);
  }
  },cardListSelector
);

const handleLoadingRequest = (textButtonSubmit) =>{
  const saveText = textButtonSubmit.innerHTML;
  textButtonSubmit.textContent = loadingText;
  return saveText;
}

const popupProfile = new PopupWithForm('.popup_type_profile', {
  handleFormSubmit: (data, textButtonSubmit) => {
    const textButton = handleLoadingRequest(textButtonSubmit);
    api
      .editProfile(data)
      .then(() => {
        userInfo.setUserInfo(profileInputNameNode, profileInputJobNode);
      })
      .catch((err) => {`Ошибка ${err}`})
      .finally(() => {
      textButtonSubmit.textContent = textButton;
      popupProfile.close();
    });
  }
}, esc);

const popupElement = new PopupWithForm('.popup_type_element', {
  handleFormSubmit: (data, textButtonSubmit) => {
    const textButton = handleLoadingRequest(textButtonSubmit);
    api
    .addCard(data)
    .then((res) => {
      сreateCard(res);
    })
    .catch((err) => {`Ошибка ${err}`})
    .finally(() => {
    textButtonSubmit.textContent = textButton;
    popupElement.close();
    })
  }
}, esc);

const popupAvatar = new PopupWithForm('.popup_type_avatar', {
  handleFormSubmit: (data, textButtonSubmit) => {
    const textButton = handleLoadingRequest(textButtonSubmit);
    api
    .updateAvatar(data.link)
    .then((res) => {
      profileImafeNode.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err) => {`Ошибка ${err}`})
    .finally(() => {
    textButtonSubmit.textContent = textButton;
    popupAvatar.close();
    });
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

function handleOpenPopupAvatar(){
  popupAvatar.open();
  checkformPopupAvatarNode.resetValidityState();
}

popupImage.setEventListeners();
popupElement.setEventListeners();
popupProfile.setEventListeners();
popupAvatar.setEventListeners();

checkformPopupProfileNode.enableValidation();
checkformPopupElementNode.enableValidation();
checkformPopupAvatarNode.enableValidation();

profileEditButtonNode.addEventListener('click',handleOpenPopupProfile);
profileAddButtonNode.addEventListener('click',handleOpenPopupElement);
profileEditAvatarButtonNode.addEventListener('click',handleOpenPopupAvatar);
