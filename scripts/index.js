const initialCards = [
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

const profileAuthorNode = document.querySelector('.profile__author');
const profileCaptionNode = document.querySelector('.profile__caption');
const profileEditButtonNode = document.querySelector('.profile__edit-button');
const profileAddButtonNode = document.querySelector('.profile__add-button');

const listContainerElement = document.querySelector('.elements');
const templateCardNode = document.querySelector('.template-card');

const popupProfileNode = document.querySelector('.popup_type_profile');
const popupElementNode = document.querySelector('.popup_type_element');
const popupImageNode = document.querySelector('.popup_type_image');

const profileInputNameNode = popupProfileNode.querySelector('.popup__input_type_name');
const profileInputJobNode = popupProfileNode.querySelector('.popup__input_type_job');

const elementInputNameNode =  popupElementNode.querySelector('.popup__input_type_name');
const elementInputLinkNode = popupElementNode.querySelector('.popup__input_type_link');
const elementInputImageNode = popupImageNode.querySelector('.popup__image');
const elementInputCaptionNode = popupImageNode.querySelector('.popup__caption');

const popupCloseButtonProfileNode = popupProfileNode.querySelector('.popup__close-button');
const popupCloseButtonElementNode = popupElementNode.querySelector('.popup__close-button');
const popupCloseButtonImageNode = popupImageNode.querySelector('.popup__close-button');

function composeCard(item){
  const newCard = templateCardNode.content.cloneNode(true);
  const headerElement = newCard.querySelector('.element__title');
  const imageElement = newCard.querySelector('.element__image');
  const removeButton = newCard.querySelector('.element__button-delete');
  const elementButtonLike = newCard.querySelector('.element__button-like');

  headerElement.textContent = item.name;
  imageElement.src = item.link;

  removeButton.addEventListener('click',handleElementButtonDelete);
  elementButtonLike.addEventListener('click',handleElementButtonLikeActive);
  imageElement.addEventListener('click',handleOpenPopupImage);

  return newCard;
}

function handleAddPopupVisibility(popup){
  popup.classList.add('popup_visible');
}

function handleOpenPopupProfile(){
  handleAddPopupVisibility(popupProfileNode);
  profileInputNameNode.value = profileAuthorNode.textContent;
  profileInputJobNode.value = profileCaptionNode.textContent;
}

function handleOpenPopupElement(){
  handleAddPopupVisibility(popupElementNode);
  const buttonResetPopupElementForm = popupElementNode.querySelector('.popup__form');
  buttonResetPopupElementForm.reset();
}

function handleOpenPopupImage(event){
  handleAddPopupVisibility(popupImageNode);
  const currentElementNode = event.target.closest('.element');
  const currentElementImageNode = currentElementNode.querySelector('.element__image');
  const cuurentElementTitltNode = currentElementNode.querySelector('.element__title');
  elementInputImageNode.src = currentElementImageNode.src;
  elementInputCaptionNode.textContent = cuurentElementTitltNode.textContent;
}

function renderList(){
  const listCards = initialCards.map(composeCard);
  listContainerElement.append(...listCards);
}

renderList();

function handleClosePopup(popup){
  popup.classList.remove('popup_visible');
}

function handleAddNewElement(event){
  const inputText = elementInputNameNode.value;
  const inputLink = elementInputLinkNode.value;
  const newElement = composeCard({name: inputText, link: inputLink});
  listContainerElement.prepend(newElement);
}

function handleProfileFormSubmit(event){
  event.preventDefault();
  profileAuthorNode.textContent = profileInputNameNode.value;
  profileCaptionNode.textContent = profileInputJobNode.value;
  handleClosePopup(popupProfileNode);
 }

function handleAddElementFormSubmit(event){
  event.preventDefault();
  handleAddNewElement();
  handleClosePopup(popupElementNode);
}

function handleElementButtonLikeActive(event){
  event.target.classList.toggle('element__button-like_active');
}

function handleElementButtonDelete(event){
  event.target.closest('.element').remove();
}

popupCloseButtonProfileNode.addEventListener('click',() => {handleClosePopup(popupProfileNode)});
popupCloseButtonElementNode.addEventListener('click',() => {handleClosePopup(popupElementNode)});
popupCloseButtonImageNode.addEventListener('click',() => {handleClosePopup(popupImageNode)});

profileEditButtonNode.addEventListener('click',handleOpenPopupProfile);
profileAddButtonNode.addEventListener('click',handleOpenPopupElement);

popupProfileNode.addEventListener('submit',  handleProfileFormSubmit);
popupElementNode.addEventListener('submit', handleAddElementFormSubmit);
