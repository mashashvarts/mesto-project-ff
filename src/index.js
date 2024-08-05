import '../pages/index.css';
import { initialCards} from '../src/cards.js';
import { openModal, closeModal } from './modal.js'; 

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');


//popups
const editProfilePopup = document.querySelector('.popup_type_edit');


//btn - popups
const editProfileBtn = document.querySelector('.profile__edit-button');


//btn popups listeners 
editProfileBtn.addEventListener('click', () => openModal(editProfilePopup));


//close btn popups
const closeModalBtn = document.querySelector('.popup__close');


closeModalBtn.addEventListener('click', () => closeModal(editProfilePopup));










// @todo: Функция создания карточки
function createCard(item, deleteCard, likeCard) {
    let isLiked = false;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    likeButton.addEventListener('click', likeCard);
    deleteButton.addEventListener('click', deleteCard);
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
}

function likeCard(evt) {
    const currentCard = evt.target.closest('.places__item');
    const currentCardLikeBtn = currentCard.querySelector('.card__like-button').classList;

    if (currentCard.querySelector('.card__like-button_is-active')) {
        currentCardLikeBtn.remove('card__like-button_is-active');
    } else {
        currentCardLikeBtn.add('card__like-button_is-active');
    }
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
const cardElement = createCard(item, deleteCard, likeCard);
cardsContainer.append(cardElement);
});

