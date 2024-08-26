import "../pages/index.css";
import { createCard } from "./components/card.js";
import { openModal, closeModal, handleOverlayClose } from "./components/modal.js";
import { initialCards } from "./components/cards.js";

const cardsContainer = document.querySelector(".places__list");
const editProfileBtn = document.querySelector(".profile__edit-button");
const newCardBtn = document.querySelector(".profile__add-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = editProfilePopup.querySelector(".popup__input_type_name");
const jobInput = editProfilePopup.querySelector(".popup__input_type_description");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");
const editProfileForm = editProfilePopup.querySelector(".popup__form");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");

// обработчик редактирования профиля

editProfileBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfilePopup);
});

// обработчик отправки форм

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfilePopup);
});

// открытие модального окна изображения карточки

cardsContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__image')) {
    const card = {
      link: evt.target.src,
      name: evt.target.alt,
    };
    showImagePopup(card);
  }
});

newCardBtn.addEventListener("click", () => {
  openModal(newCardPopup);
});

newCardPopup.querySelector(".popup__form").addEventListener("submit", (evt) => {
  handleClickAddCard(evt);
  closeModal(newCardPopup);
});


function handleClickAddCard(evt) { 
  evt.preventDefault();

  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

  const cardElement = createCard(newCard);
  cardsContainer.prepend(cardElement);

  cardNameInput.value = "";
  cardLinkInput.value = "";
}


function showImagePopup(card) {
  console.log(card)
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
  openModal(popupTypeImage);
}


// отображение шести карточек при открытии страницы
renderCards(); 

function renderCards() {
  initialCards.forEach((item) => {
    const cardElement = createCard(item, showImagePopup);
    cardsContainer.append(cardElement);
  });
}

// функиция обработчик событий по оверлею
document
  .querySelectorAll(".popup")
  .forEach((popup) =>
    popup.addEventListener("click", (evt) => handleOverlayClose(evt))
  );
