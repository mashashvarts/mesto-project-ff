import "../pages/index.css";
import {
  getProfileData,
  getInitialCards,
  updateProfileInfo,
  createCard as createCardApi,
  updateAvatar,
} from "./components/api.js";
import { createCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation } from "./components/validation.js";

// Элементы профиля и кнопки
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const profileEditButton = document.querySelector(".profile__edit-button");
const avatarEditButton = document.querySelector(".profile__image_edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// Модальные окна и формы
const profilePopup = document.querySelector(".popup_type_edit");
const profileForm = profilePopup.querySelector(".popup__form");
const profileNameInput = profileForm.querySelector(".popup__input_type_name");
const profileDescriptionInput = profileForm.querySelector(
  ".popup__input_type_description"
);

const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardForm = newCardPopup.querySelector(".popup__form");
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

const avatarPopup = document.querySelector(".popup_type_avatar_edit");
const avatarForm = avatarPopup.querySelector(".popup__form");
const avatarLinkInput = avatarForm.querySelector(
  ".popup__input_type_avatar"
);

const previewPopup = document.querySelector(".popup_type_image");
const previewImage = previewPopup.querySelector(".popup__image");
const previewCaption = previewPopup.querySelector(".popup__caption");

const deleteCardPopup = document.querySelector(".popup_type_confirm_delete");

// Контейнер для карточек и шаблон карточки
const cardsContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

let currentUserId; // ID текущего пользователя

// Инициализация данных профиля и карточек
Promise.all([getProfileData(), getInitialCards()])
  .then(([userData, initialCards]) => {
    currentUserId = userData._id;
    setProfileData(userData);
    renderCards(initialCards.reverse(), currentUserId);
  })
  .catch((err) => console.error(`Ошибка: ${err}`));

// Функция установки данных профиля
function setProfileData(data) {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  profileAvatar.style.backgroundImage = `url(${data.avatar})`;
}

// Функция рендеринга карточек
function renderCards(cards, userId) {
  cards.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      cardTemplate,
      showImagePopup,
      deleteCardPopup,
      userId
    );
    cardsContainer.prepend(cardElement);
  });
}

// Открытие модального окна редактирования профиля
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profilePopup);
});

// Обработка сохранения данных профиля
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileForm.querySelector(".popup__button").textContent = "Сохранение...";

  updateProfileInfo(profileNameInput.value, profileDescriptionInput.value)
    .then((data) => {
      setProfileData(data);
      closeModal(profilePopup);
    })
    .catch((err) => console.error(`Ошибка: ${err}`))
    .finally(() => {
      profileForm.querySelector(".popup__button").textContent = "Сохранить";
    });
});

// Открытие модального окна добавления новой карточки
addCardButton.addEventListener("click", () => {
  newCardForm.reset();
  openModal(newCardPopup);
});

// Обработка добавления новой карточки
newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  newCardForm.querySelector(".popup__button").textContent = "Создание...";

  createCardApi(cardNameInput.value, cardLinkInput.value)
    .then((cardData) => {
      const cardElement = createCard(
        cardData,
        cardTemplate,
        showImagePopup,
        deleteCardPopup,
        currentUserId
      );
      cardsContainer.prepend(cardElement);
      closeModal(newCardPopup);
    })
    .catch((err) => console.error(`Ошибка: ${err}`))
    .finally(() => {
      newCardForm.querySelector(".popup__button").textContent = "Создать";
    });
});

// Открытие модального окна редактирования аватара
avatarEditButton.addEventListener("click", () => {
  avatarForm.reset();
  openModal(avatarPopup);
});

// Обработка сохранения аватара пользователя
avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  avatarForm.querySelector(".popup__button").textContent = "Сохранение...";

  updateAvatar(avatarLinkInput.value)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      closeModal(avatarPopup);
    })
    .catch((err) => console.error(`Ошибка: ${err}`))
    .finally(() => {
      avatarForm.querySelector(".popup__button").textContent = "Сохранить";
    });
});

// Функция открытия попапа с изображением
function showImagePopup(name, link) {
  previewImage.src = link;
  previewImage.alt = name;
  previewCaption.textContent = name;
  openModal(previewPopup);
}

// Включение валидации для всех форм
enableValidation();
