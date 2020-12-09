const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
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
  imageElement.addEventListener('click',handleOpenImageElement);

  return newCard;
}

function handleAddPopupVisibility(event){
  if(event.target.classList.contains('profile__edit-button')){
     popupProfileNode.classList.add('popup_visible');
     profileInputNameNode.value = profileAuthorNode.textContent;
     profileInputJobNode.value = profileCaptionNode.textContent;
  }
  else{
    popupElementNode.classList.add('popup_visible');
    elementInputNameNode.value ='';
    elementInputLinkNode.value = '';
  }
}

function renderList(){
  const listCards = initialCards.map(composeCard);
  listContainerElement.append(...listCards);
}

renderList();

function handleClosePopup(event){
  let currentPopup = event.target.closest('.popup')
  currentPopup.classList.remove('popup_visible');
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
  handleClosePopup(event);
 }

function handleAddElementFormSubmit(event){
  event.preventDefault();
  handleAddNewElement();
  handleClosePopup(event);
}

function handleOpenImageElement(event){
  let currentElementNode = event.target.closest('.element');
  let currentElementImageNode = currentElementNode.querySelector('.element__image');
  let cuurentElementTitltNode = currentElementNode.querySelector('.element__title');
  elementInputImageNode.src = currentElementImageNode.src;
  elementInputCaptionNode.textContent = cuurentElementTitltNode.textContent;
  popupImageNode.classList.add('popup_visible');
}


function handleElementButtonLikeActive(event){
  event.target.classList.toggle('element__button-like_active');
}

function handleElementButtonDelete(event){
  event.target.closest('.element').remove();
}

popupCloseButtonProfileNode.addEventListener('click',handleClosePopup);
popupCloseButtonElementNode.addEventListener('click',handleClosePopup);
popupCloseButtonImageNode.addEventListener('click',handleClosePopup);

profileEditButtonNode.addEventListener('click',handleAddPopupVisibility);
profileAddButtonNode.addEventListener('click', handleAddPopupVisibility);

popupProfileNode.addEventListener('submit', handleProfileFormSubmit);
popupElementNode.addEventListener('submit', handleAddElementFormSubmit);
