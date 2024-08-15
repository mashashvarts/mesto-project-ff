import '../pages/index.css';
  import { renderCards, handleClickAddCard } from './components/cards.js';
  import { openModal, closeModal } from './components/modal.js';

  const editProfileBtn = document.querySelector('.profile__edit-button');
  const newCardBtn = document.querySelector('.profile__add-button');
  const editProfilePopup = document.querySelector('.popup_type_edit');
  const newCardPopup = document.querySelector('.popup_type_new-card');
  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
  const jobInput = editProfilePopup.querySelector('.popup__input_type_description');
  const editProfileForm = editProfilePopup.querySelector('.popup__form');

  editProfileBtn.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
      openModal(editProfilePopup);``
  });

  editProfileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(editProfilePopup);
  });

  newCardBtn.addEventListener('click', () => {
      openModal(newCardPopup);
  });

  newCardPopup.querySelector('.popup__form').addEventListener('submit', handleClickAddCard);

  document.addEventListener('DOMContentLoaded', renderCards);