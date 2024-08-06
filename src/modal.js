// ОС на крестик
const addEventCloseModal = function (modal) {
  modal
    .querySelector(".popup__close")
    .addEventListener("click", () => closeModal(modal));
};

// ОС на Esc
const closeModalEsc = function (modal) {
  document.addEventListener("keydown", (evt) => checkPressedKey(evt, modal));
};

const checkPressedKey = (evt, modal) => {
  if (evt.key === "Escape") {
    closeModal(modal);
  }
};

// ОС на оверлей
const clickOutsideModal = function (modal) {
  modal.addEventListener("click", (evt) => checkClickedArea(evt, modal));
};

const checkClickedArea = (evt, modal) => {
  if (!modal.querySelector(".popup__content").contains(evt.target)) {
    closeModal(modal);
  }
  //!modal.querySelector(".popup__content").contains(evt.target) && closeModal(modal) альтернативный вариант!!!
};

//основные фукнции - открытие
function openModal(modal) {
  modal.classList.add("popup_is-opened");
  addEventCloseModal(modal);
  closeModalEsc(modal);
  clickOutsideModal(modal);
}

//закрытие
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalEsc);
  modal.removeEventListener("click", clickOutsideModal);
  modal
    .querySelector(".popup__close")
    .removeEventListener("click", addEventCloseModal);
}

export { openModal, closeModal };
