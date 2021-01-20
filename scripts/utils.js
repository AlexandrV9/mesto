export const popupImageNode = document.querySelector('.popup_type_image');

export const elementInputImageNode = popupImageNode.querySelector('.popup__image');
export const elementInputCaptionNode = popupImageNode.querySelector('.popup__caption');

const esc = 'Escape';

export function openPopup(popup){
  disableScroll();
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', handleClosePopupByEscButton);
}

export function сlosePopup(popup){
  enableScroll();
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

function disableScroll() {
  let pagePosition = window.scrollY;
  document.body.classList.add('disable-scroll');
  document.body.dataset.position = pagePosition;
  document.body.style.top = -pagePosition + 'px';
}

function enableScroll() {
  let pagePosition = parseInt(document.body.dataset.position, 10);
  document.body.style.top = 'auto';
  document.body.classList.remove('disable-scroll');
  window.scroll({ top: pagePosition, left: 0 });
  document.body.removeAttribute('data-position');
}
