// функция создания карточки

function createCard(item, likeCard, deleteCard, showImagePopup) {
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
    cardImage.addEventListener("click", showImagePopup);
  
    return cardElement;
  }

  // функция лайка
  
  function likeCard(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
  
  // функция удаления карточки
  
  function deleteCard(evt) {
    evt.target.closest(".places__item").remove();
  }
  
  
  
  export { createCard };