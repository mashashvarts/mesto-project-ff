// Функция открытия модального окна
function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

// Функция закрытия модального окна
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

// Закрытие по Esc
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    closeModal(openedModal);
  }
}

// функиция обработчик событий по оверлею

document
  .querySelectorAll(".popup")
  .forEach((popup) =>
    popup.addEventListener("click", (evt) => handleOverlayClose(evt))
  );

function handleOverlayClose(evt) {
  if (
    (evt.target.classList.contains("popup") &&
      !evt.target.classList.contains("popup__content")) ||
    evt.target.classList.contains("popup__close")
  ) {
    const openedModal = document.querySelector(".popup_is-opened");
    closeModal(openedModal);
  }
}

export { openModal, closeModal };