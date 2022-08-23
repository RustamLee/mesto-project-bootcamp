
//ВАЛИДАЦИЯ ФОРМ

import {toggleButtonState} from './utils.js';

//обработчики ошибок
export const showError = (formElement, inputElement, errorMessage, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass)
};
export const hideError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = "";
};

export const checkInputValidity = (formElement, inputElement, options) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, options);
  } else {
    hideError(formElement, inputElement, options);
  }
};

export function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export const setEventListener = (formElement,options) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  toggleButtonState(inputList, buttonElement,options);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement,options);
      toggleButtonState(inputList, buttonElement,options);
    });
  });
};

export const enablevalidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    setEventListener(formElement, options);
  });
};
