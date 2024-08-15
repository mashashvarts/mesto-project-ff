import { closeModal, openModal } from './modal';

const initialCards = [
    { name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg' },
    { name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg' },
    { name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg' },
    { name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg' },
    { name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg' },
    { name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg' },
];

const cardsContainer = document.querySelector('.places__list');
const newCardPopup = document.querySelector('.popup_type_new-card');

function createCard(item) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    likeButton.addEventListener('click', likeCard);
    deleteButton.addEventListener('click', deleteCard);
    cardImage.addEventListener('click', () => showImagePopup(item));
    return cardElement;
}

function renderCards() {
    initialCards.forEach((item) => {
        const cardElement = createCard(item);
        cardsContainer.append(cardElement);
    });
}

function handleClickAddCard(evt) {
    evt.preventDefault();
    const newCard = {
        name: newCardPopup.querySelector('.popup__input_type_card-name').value,
        link: newCardPopup.querySelector('.popup__input_type_url').value,
    };
    const cardElement = createCard(newCard);
    cardsContainer.prepend(cardElement);
    newCardPopup.querySelector('.popup__input_type_card-name').value = '';
    newCardPopup.querySelector('.popup__input_type_url').value = '';
    closeModal(newCardPopup);
}

function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
}

function showImagePopup(card) {
  const popupTypeImage = document.querySelector('.popup_type_image');
  const popupImage = popupTypeImage.querySelector('.popup__image');
  const popupCaption = popupTypeImage.querySelector('.popup__caption');
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
  openModal(popupTypeImage);
}

function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

export { createCard, renderCards, handleClickAddCard };