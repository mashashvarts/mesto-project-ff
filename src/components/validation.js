const selectors = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  };
  
  // Показать ошибку ввода
  function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
  }
  
  // Скрыть ошибку ввода
  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(selectors.errorClass);
  }
  
  // Проверка валидности ввода
  function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }
  
  // Проверка наличия невалидных инпутов
  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }
  
  // Переключение состояния кнопки
  function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(selectors.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(selectors.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  
  // Установка слушателей событий для формы
  function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  }
  
  // Включение валидации для всех форм
  export function enableValidation() {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  }
  