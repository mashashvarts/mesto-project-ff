// Определение селекторов для валидации
export const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Функция для отображения ошибки ввода
function showInputError(formElement, inputElement, errorMessage, selectors) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
}

// Функция для скрытия ошибки ввода
function hideInputError(formElement, inputElement, selectors) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(selectors.errorClass);
}

// Функция проверки валидности ввода
function checkInputValidity(formElement, inputElement, selectors) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
  } else {
    hideInputError(formElement, inputElement, selectors);
  }
}

// Функция проверки наличия невалидных инпутов
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

// Функция переключения состояния кнопки отправки
function toggleButtonState(inputList, buttonElement, selectors) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Функция установки слушателей событий для формы
function setEventListeners(formElement, selectors) {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, selectors);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, selectors);
      toggleButtonState(inputList, buttonElement, selectors);
    });
  });
}

// Функция включения валидации для всех форм
export function enableValidation(selectors) {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, selectors);
  });
}
