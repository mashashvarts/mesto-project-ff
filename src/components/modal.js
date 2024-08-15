// Функция открытия модального окна
function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
  modal.addEventListener('click', handleOverlayClose);

  const closeButton = modal.querySelector('.popup__close');
  closeButton.addEventListener('click', () => closeModal(modal));

  modal.addEventListener('click', handleOverlayClose);
}

// Функция закрытия модального окна
function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
  modal.removeEventListener('click', handleOverlayClose);
}

// Закрытие по Esc
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
      const openedModal = document.querySelector('.popup_is-opened');
      closeModal(openedModal);
  }
}

// Закрытие по клику на оверлей
function handleOverlayClose(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(evt.target);
  }
}

export { openModal, closeModal };