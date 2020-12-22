const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputInvalidClass: 'popup__input_state_invalid',
  buttonInvalidClass: 'popup__button_invalid',
};

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

const buttonSumbitProfileNode = popupProfileNode.querySelector('.popup__input-submit-button');
const buttonSumbitElementNode = popupElementNode.querySelector('.popup__input-submit-button');

const formPopupProfileNode = popupProfileNode.querySelector('.popup__form');
const formPopupElementNode = popupElementNode.querySelector('.popup__form');

const popupCloseButtonProfileNode = popupProfileNode.querySelector('.popup__close-button');
const popupCloseButtonElementNode = popupElementNode.querySelector('.popup__close-button');
const popupCloseButtonImageNode = popupImageNode.querySelector('.popup__close-button');

enableValidation(validationConfig);

function composeCard(item){
  const newCard = templateCardNode.content.cloneNode(true);
  const headerElement = newCard.querySelector('.element__title');
  const imageElement = newCard.querySelector('.element__image');
  const removeButton = newCard.querySelector('.element__button-delete');
  const elementButtonLike = newCard.querySelector('.element__button-like');

  headerElement.textContent = item.name;
  imageElement.src = item.link;
  imageElement.alt = item.name;

  removeButton.addEventListener('click',handleElementButtonDelete);
  elementButtonLike.addEventListener('click',handleElementButtonLikeActive);
  imageElement.addEventListener('click',handleOpenPopupImage);

  return newCard;
}

function openPopup(popup){
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', handleClosePopupByEscButton);
}

function сlosePopup(popup){
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', handleClosePopupByEscButton);
}

function handleOpenPopupProfile(){
  openPopup(popupProfileNode);
  profileInputNameNode.value = profileAuthorNode.textContent;
  profileInputJobNode.value = profileCaptionNode.textContent;
  setButtonState(buttonSumbitProfileNode, formPopupProfileNode.checkValidity(), validationConfig);
  resetValidityState(popupProfileNode, validationConfig);
}

function handleOpenPopupElement(){
  openPopup(popupElementNode);
  const buttonResetPopupElementForm = popupElementNode.querySelector('.popup__form');
  buttonResetPopupElementForm.reset();
  setButtonState(buttonSumbitElementNode, formPopupElementNode.checkValidity(), validationConfig);
  resetValidityState(popupElementNode, validationConfig);
}

function handleOpenPopupImage(event){
  openPopup(popupImageNode);
  const currentElementNode = event.target.closest('.element');
  const currentElementImageNode = currentElementNode.querySelector('.element__image');
  const cuurentElementTitltNode = currentElementNode.querySelector('.element__title');
  elementInputImageNode.src = currentElementImageNode.src;
  elementInputCaptionNode.textContent = cuurentElementTitltNode.textContent;
  elementInputImageNode.alt = cuurentElementTitltNode.textContent;
}

function renderList(){
  const listCards = initialCards.map(composeCard);
  listContainerElement.append(...listCards);
}

renderList();

function handleAddNewElement(){
  const inputText = elementInputNameNode.value;
  const inputLink = elementInputLinkNode.value;
  const newElement = composeCard({name: inputText, link: inputLink});
  listContainerElement.prepend(newElement);
}

function handleProfileFormSubmit(){
  profileAuthorNode.textContent = profileInputNameNode.value;
  profileCaptionNode.textContent = profileInputJobNode.value;
  сlosePopup(popupProfileNode);
 }

function handleAddElementFormSubmit(){
  handleAddNewElement();
  сlosePopup(popupElementNode);
}

function handleElementButtonLikeActive(event){
  event.target.classList.toggle('element__button-like_active');
}

function handleElementButtonDelete(event){
  event.target.closest('.element').remove();
}

function handleClosePopupByOverlay(popup){
  return (event) => {
    if (event.target === event.currentTarget) {
      сlosePopup(popup);
    };
  }
}

const handleClosePopupByEscButton = (event) => {
  if (event.key === 'Escape') {
    const currentOpenPopup = document.querySelector('.popup_visible');
    сlosePopup(currentOpenPopup);
  }
  return;
}

popupCloseButtonProfileNode.addEventListener('click',() => {сlosePopup(popupProfileNode)});
popupCloseButtonElementNode.addEventListener('click',() => {сlosePopup(popupElementNode)});
popupCloseButtonImageNode.addEventListener('click',() => {сlosePopup(popupImageNode)});

profileEditButtonNode.addEventListener('click',handleOpenPopupProfile);
profileAddButtonNode.addEventListener('click',handleOpenPopupElement);

popupProfileNode.addEventListener('submit',  handleProfileFormSubmit);
popupElementNode.addEventListener('submit', handleAddElementFormSubmit);

popupProfileNode.addEventListener('click', handleClosePopupByOverlay(popupProfileNode));
popupElementNode.addEventListener('click', handleClosePopupByOverlay(popupElementNode));
popupImageNode.addEventListener('click', handleClosePopupByOverlay(popupImageNode));
