export const initialCards = [
  {
      name: 'Канберра',
      link: 'https://images.unsplash.com/photo-1555848960-8c3ed4cf32a0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
      name: 'Москва',
      link: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=687&q=80'
  },
  {
      name: 'Вашингтон',
      link: 'https://images.unsplash.com/photo-1501466044931-62695aada8e9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1278&q=80'
  },
  {
      name: 'Токио',
      link: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
      name: 'Рим',
      link: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80'
  },
  {
      name: 'Берлин',
      link: 'https://images.unsplash.com/photo-1509136561942-7d8663edaaa2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80'
  }
];

export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputInvalidClass: 'popup__input_state_invalid',
  buttonInvalidClass: 'popup__button_invalid'
};

export const userParameters = {
  nameUserSelector: '.profile__author',
  descriptionUserSelector: '.profile__caption'
}

export const cardListSelector = '.elements';

export const esc = 'Escape';

export const profileAuthorNode = document.querySelector('.profile__author');
export const profileCaptionNode = document.querySelector('.profile__caption');
export const profileImafeNode = document.querySelector('.profile__avatar');
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
