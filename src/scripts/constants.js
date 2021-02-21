export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputInvalidClass: 'popup__input_state_invalid',
  buttonInvalidClass: 'popup__button_invalid'
};

export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-20/',
  headers: {
    authorization: 'c11cc168-18b7-47ef-9e2e-a935593ae9b6',
    'Content-Type': 'application/json'
  },
}

export const userParameters = {
  nameUserSelector: '.profile__author',
  descriptionUserSelector: '.profile__caption'
}

export const cardListSelector = '.elements';

export const esc = 'Escape';
export const loadingSaveText = 'Сохранение...';
export const loadingDeleteText = 'Удаление...';

export const profileAuthorNode = document.querySelector('.profile__author');
export const profileCaptionNode = document.querySelector('.profile__caption');
export const profileImafeNode = document.querySelector('.profile__avatar');
export const profileEditAvatarButtonNode = document.querySelector('.profile__avatar-cover');
export const profileAddButtonNode = document.querySelector('.profile__add-button');
export const profileEditButtonNode = document.querySelector('.profile__edit-button');

export const popupProfileNode = document.querySelector('.popup_type_profile');
export const profileInputNameNode = popupProfileNode.querySelector('.popup__input_type_name');
export const profileInputJobNode = popupProfileNode.querySelector('.popup__input_type_job');

export const popupImagetNode = document.querySelector('.popup_type_image');
export const elementInputImageNode = popupImagetNode.querySelector('.popup__image');
export const elementInputCaptionNode = popupImagetNode.querySelector('.popup__caption');

export const popupElementNode = document.querySelector('.popup_type_element');
export const elementInputNameNode =  popupElementNode.querySelector('.popup__input_type_name');
export const elementInputLinkNode = popupElementNode.querySelector('.popup__input_type_link');
