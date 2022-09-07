
//ВАЛИДАЦИЯ ФОРМ
//обработчики ошибок
export const showError = (inputElement, options, errorMessage) => {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  console.log(errorElement);
  inputElement.classList.add(options.inputErrorClass);
  errorElement.classList.add(options.errorClass);
  errorElement.textContent = errorMessage;
};

export const hideError = (inputElement, options) => {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = '';
};

export const checkInputValidity = (inputElement, options) => {
  if (!inputElement.validity.valid) {
    showError(inputElement, options, inputElement.validationMessage);
  } else {
    hideError(inputElement, options);
  }
};

export function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export const revalidationForm = (formElement, options) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideError(inputElement, options);
  });
  disableSubmitButtot(buttonElement, options);
};

export function disableSubmitButtot(buttonElement, { inactiveButtonClass }) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
};

export function enableSubmitButton(buttonElement, { inactiveButtonClass }) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
};

export function toggleButtonState(inputList, buttonElement, options) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButtot(buttonElement, options);
  } else {
    enableSubmitButton(buttonElement, options);
  }
};

export const setEventListener = (formElement, options) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, options);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
};

export const enablevalidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    setEventListener(formElement, options);
  });
};
