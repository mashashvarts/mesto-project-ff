import { openModal, closeModal } from "./modal.js";
import { renderCards } from "../index.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Функция создания карточки
function createCard(item, deleteCard, likeCard, showImagePopup) {
  const cardTemplate = document.querySelector("#card-template").content;
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

const newCardBtn = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
let currentCards = initialCards;

//функция добавления карточки
const handleClickAddCard = function (evt) {
  evt.preventDefault();

  const newCard = {
    name: newCardPopup.querySelector(".popup__input_type_card-name").value,
    link: newCardPopup.querySelector(".popup__input_type_url").value,
  };

  currentCards = [newCard, ...currentCards];
  newCardPopup.querySelector(".popup__input_type_card-name").value = "";
  newCardPopup.querySelector(".popup__input_type_url").value = "";
  closeModal(newCardPopup);
  renderCards();
};

newCardBtn.addEventListener("click", () => {
  openModal(newCardPopup);
  newCardPopup
    .querySelector(".popup__form")
    .addEventListener("submit", handleClickAddCard);
});

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

export { createCard, initialCards, currentCards, likeCard };
