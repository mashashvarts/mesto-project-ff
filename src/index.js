import "../pages/index.css";
import { initialCards } from "../src/cards.js";
import { openModal, closeModal } from "./modal.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");
const popups = Array.from(document.querySelectorAll(".popup"));

//popups
const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

//btn - popups
const editProfileBtn = document.querySelector(".profile__edit-button");
const newCardBtn = document.querySelector(".profile__add-button");
const imageOpenBtn = document.querySelector(".card__image");

//btn popups listeners
editProfileBtn.addEventListener("click", () => {
  openModal(editProfilePopup);
  //editProfilePopup.querySelector('.popup__close').addEventListener('click', closeModal(editProfilePopup));
});

newCardBtn.addEventListener("click", () => {
  openModal(newCardPopup);
  // newCardBtn.querySelector('.popup__close').addEventListener('click', closeModal(newCardPopup));
});


// Функция создания карточки
function createCard(item, deleteCard, likeCard, showImagePopup) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  likeButton.addEventListener("click", likeCard);
  deleteButton.addEventListener("click", deleteCard);
  cardImage.addEventListener("click", () => showImagePopup(item));

  return cardElement;
}

//Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

//функция лайка
function likeCard(evt) {
  const currentCard = evt.target.closest(".places__item");
  const currentCardLikeBtn =
    currentCard.querySelector(".card__like-button").classList;

  if (currentCard.querySelector(".card__like-button_is-active")) {
    currentCardLikeBtn.remove("card__like-button_is-active");
  } else {
    currentCardLikeBtn.add("card__like-button_is-active");
  }
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
initialCards.forEach(function (item) {
  const cardElement = createCard(item, deleteCard, likeCard, showImagePopup);
  cardsContainer.append(cardElement);
});
