import "../pages/index.css";
import {
  initialCards,
  createCard,
  currentCards,
  likeCard,
} from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

//popups
const editProfilePopup = document.querySelector(".popup_type_edit");
const popupTypeImage = document.querySelector(".popup_type_image");

//btn - popups
const editProfileBtn = document.querySelector(".profile__edit-button");

//btn popups listeners
editProfileBtn.addEventListener("click", () => {
  const nameProfile = document.querySelector(".profile__title").textContent;
  const jobProfile = document.querySelector(
    ".profile__description"
  ).textContent;

  openModal(editProfilePopup, nameProfile, jobProfile);
});

//Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

//popup image
function showImagePopup(card) {
  const popupImage = popupTypeImage.querySelector(".popup__image");
  popupImage.src = card.link;
  popupImage.alt = card.name;

  popupTypeImage.querySelector(".popup__caption").textContent = card.name;

  openModal(popupTypeImage);
}

// Вывести карточки на страницу
function renderCards() {
  while (cardsContainer.firstChild) {
    cardsContainer.removeChild(cardsContainer.firstChild);
  }
  currentCards.forEach(function (item) {
    const cardElement = createCard(item, deleteCard, likeCard, showImagePopup);
    cardsContainer.append(cardElement);
  });
}

renderCards();

export { renderCards };
