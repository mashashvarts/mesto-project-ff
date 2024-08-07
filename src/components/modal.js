let newName = "";
let newJob = "";

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

const assignValuefromProfile = function (modal, name, job) {
  const nameInput = modal.querySelector(".popup__input_type_name");
  const jobInput = modal.querySelector(".popup__input_type_description");

  nameInput.value = name;
  jobInput.value = job;

  newName = name;
  newJob = job;
};

const handleFormEditSubmit = function (evt, modal) {
  evt.preventDefault();

  document.querySelector(".profile__title").textContent = newName;
  document.querySelector(".profile__description").textContent = newJob;

  closeModal(modal);

  modal.removeEventListener("submit", addEventSaveProfile);
};

const addEventSaveProfile = function (modal) {
  modal
    .querySelector(".popup__form")
    .addEventListener("submit", (evt) => handleFormEditSubmit(evt, modal));
};

const handleChangeNameInput = (currentText) => (newName = currentText);

const handleChangeJobInput = (currentText) => (newJob = currentText);

//основные фукнции - открытие
function openModal(modal, name = "", job = "") {
  console.log(name);
  console.log(job);
  modal.classList.add("popup_is-opened");

  if (name || job) {
    assignValuefromProfile(modal, name, job);
    const nameInput = modal.querySelector(".popup__input_type_name");
    const jobInput = modal.querySelector(".popup__input_type_description");
    nameInput.addEventListener("input", (evt) =>
      handleChangeNameInput(evt.target.value)
    );
    jobInput.addEventListener("input", (evt) =>
      handleChangeJobInput(evt.target.value)
    );
    addEventSaveProfile(modal);
  }

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
