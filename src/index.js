import "../pages/index.css";
import { renderCards } from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";

const editProfileBtn = document.querySelector(".profile__edit-button");
const newCardBtn = document.querySelector(".profile__add-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = editProfilePopup.querySelector(".popup__input_type_name");
const jobInput = editProfilePopup.querySelector(
  ".popup__input_type_description"
);

const editProfileForm = editProfilePopup.querySelector(".popup__form");

function createCard(item) {
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


editProfileBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfilePopup);
});

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfilePopup);
});

newCardBtn.addEventListener("click", () => {
  openModal(newCardPopup);
});

newCardPopup.querySelector(".popup__form").addEventListener("submit", (evt) => {
  handleClickAddCard(evt);
  closeModal(newCardPopup);
});


document.addEventListener("DOMContentLoaded", renderCards);

document.querySelectorAll(".card__image").forEach((image) => {
  image.addEventListener("click", (evt) => {
    const card = {
      link: evt.target.src,
      name: evt.target.alt,
    };
    showImagePopup(card);
    openModal(document.querySelector(".popup_type_image"));
  });
});


function handleClickAddCard(evt) {
  evt.preventDefault();

  const newCard = {
    name: document.querySelector(".popup__input_type_card-name").value,
    link: document.querySelector(".popup__input_type_url").value,
  };

  const cardElement = createCard(newCard);
  cardsContainer.prepend(cardElement);

  document.querySelector(".popup__input_type_card-name").value = "";
  document.querySelector(".popup__input_type_url").value = "";
}

function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

function showImagePopup(card) {
  const popupTypeImage = document.querySelector(".popup_type_image");
  const popupImage = popupTypeImage.querySelector(".popup__image");
  const popupCaption = popupTypeImage.querySelector(".popup__caption");

  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export {createCard}