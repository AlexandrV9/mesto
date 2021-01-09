export const popupImageNode = document.querySelector('.popup_type_image');

export const elementInputImageNode = popupImageNode.querySelector('.popup__image');
export const elementInputCaptionNode = popupImageNode.querySelector('.popup__caption');

const esc = 'Escape';

export function openPopup(popup){
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', handleClosePopupByEscButton);
}

export function сlosePopup(popup){
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', handleClosePopupByEscButton);
}

export const handleClosePopupByEscButton = (event) => {
  if (event.key === esc) {
    const currentOpenPopup = document.querySelector('.popup_visible');
    сlosePopup(currentOpenPopup);
  }
  return;
}
