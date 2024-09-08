import { setLike, unsetLike, deleteCard as deleteCardApi } from "./api.js";


// Функция для проверки, лайкнута ли карточка текущим пользователем
function hasBeenLikedByCurrentUser(card, userId) {
  return card.likes.some((like) => like._id === userId);
}

// Функция создания карточки
export function createCard(
  cardData,
  cardTemplate,
  renderPreviewCallback,
  deletePopup,
  userId,
  openModal,
  closeModal,
  setDeleteCardAction
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const likeCount = cardElement.querySelector(".card__like-counter");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");

  // Установка названия и изображения карточки
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  // Установка лайков
  likeCount.textContent = cardData.likes.length;
  if (hasBeenLikedByCurrentUser(cardData, userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Обработчик клика по кнопке лайка
  likeButton.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("card__like-button_is-active")) {
      unsetLike(cardData._id)
        .then((updatedCard) => {
          likeButton.classList.remove("card__like-button_is-active");
          likeCount.textContent = updatedCard.likes.length;
        })
        .catch(console.error);
    } else {
      setLike(cardData._id)
        .then((updatedCard) => {
          likeButton.classList.add("card__like-button_is-active");
          likeCount.textContent = updatedCard.likes.length;
        })
        .catch(console.error);
    }
  });

  let currentCardToDelete = null; 

  // Обработчик клика по кнопке удаления
  if (cardData.owner._id === userId) {
    deleteButton.addEventListener("click", () => {
      currentCardToDelete = cardElement;
      openModal(deletePopup);
      setDeleteCardAction((e) => {
        e.preventDefault()
        deleteCardApi(cardData._id)
          .then(() => {
            currentCardToDelete.remove();
            closeModal(deletePopup);
          })
          .catch(console.error);
      });
    });
  } else {
    deleteButton.remove();
  }

  // Обработчик клика по изображению карточки
  cardImage.addEventListener("click", () =>
    renderPreviewCallback(cardData.name, cardData.link)
  );

  return cardElement;
}
