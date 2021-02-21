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
  loadingSaveText,
  loadingDeleteText
} from '../scripts/constants.js'

const checkformPopupProfileNode = new FormValidator(validationConfig, '.popup__form_type_profile');
const checkformPopupElementNode = new FormValidator(validationConfig, '.popup__form_type_element');
const checkformPopupAvatarNode = new FormValidator(validationConfig, '.popup__form_type_avatar');

const popupImage = new PopupWithImage('.popup_type_image', elementInputImageNode, elementInputCaptionNode, esc);

const userInfo = new UserInfo(userParameters, profileInputNameNode, profileInputJobNode);

const api = new API(apiConfig);

let myId;

Promise.all([
  api.getUserInfo(),
  api.getAllCards(),
  ])
  .then(([userData, initialCards]) => {
    myId = userData._id;
    profileAuthorNode.textContent =  userData.name;
    profileCaptionNode.textContent = userData.about;
    profileImafeNode.style.backgroundImage = `url(${userData.avatar})`;

    cardList.renderItems(initialCards.reverse());
  })
  .catch((err) => {
    console.log(`Ошибка ${err}`);
})

const popupWithSubmit = new PopupWithSubmit('.popup_type_confirmation-card-delete', esc, {
  handleCardDelete: (IdCard, currentCard, textButtonSubmit) => {
    const textButton = handleLoadingRequest(textButtonSubmit, loadingDeleteText);
    api
      .deleteCard(IdCard)
      .then(() => {
        currentCard.remove();
        currentCard = '';
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        textButtonSubmit.textContent = textButton;
        popupWithSubmit.close();
      });
  }
});

function сreateCard(cardItem) {
  const card = new Card(cardItem,'.template-card', myId, {

    handleCardClick: (elementTitle, elementImage) => {
      popupImage.open(elementTitle, elementImage);
    },

    handleDeleteClick: (currentCard) =>{
      popupWithSubmit.open(currentCard, cardItem._id)
    },

    handleElementButtonLikeActive: (cardId, isLike, handleAddLikeClick, handleDeleteLikeClick) => {
      if(isLike()){
        api
          .deleteLike(cardId)
          .then((res) => {
          handleAddLikeClick(res);
        })
      }
      else{
        api
            .addLike(cardId)
            .then((res) => {
            handleDeleteLikeClick(res);
          });
      }
    }
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

const handleLoadingRequest = (textButtonSubmit, replacementText) =>{
  const saveText = textButtonSubmit.innerHTML;
  textButtonSubmit.textContent = replacementText;
  return saveText;
}

const popupProfile = new PopupWithForm('.popup_type_profile', {
  handleFormSubmit: (data, textButtonSubmit) => {
    const textButton = handleLoadingRequest(textButtonSubmit, loadingSaveText);
    api
      .editProfile(data)
      .then(() => {
        userInfo.setUserInfo(profileInputNameNode, profileInputJobNode);
      })
      .catch((err) => {console.log(`Ошибка ${err}`);})
      .finally(() => {
        textButtonSubmit.textContent = textButton;
        popupProfile.close();
    });
  }
}, esc);

const popupElement = new PopupWithForm('.popup_type_element', {
  handleFormSubmit: (data, textButtonSubmit) => {
    const textButton = handleLoadingRequest(textButtonSubmit, loadingSaveText);
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
    const textButton = handleLoadingRequest(textButtonSubmit, loadingSaveText);
    api
    .updateAvatar(data.link)
    .then((res) => {
      profileImafeNode.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err) => {console.log(`Ошибка ${err}`);})
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
popupWithSubmit.setEventListeners();
popupProfile.setEventListeners();
popupAvatar.setEventListeners();

checkformPopupProfileNode.enableValidation();
checkformPopupElementNode.enableValidation();
checkformPopupAvatarNode.enableValidation();

profileEditButtonNode.addEventListener('click',handleOpenPopupProfile);
profileAddButtonNode.addEventListener('click',handleOpenPopupElement);
profileEditAvatarButtonNode.addEventListener('click',handleOpenPopupAvatar);
