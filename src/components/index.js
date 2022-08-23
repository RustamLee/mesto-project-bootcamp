
import '../../src/index.css';
import {editProfile, popupProfile, popupNewPlace, newPlaceButton, closeButtons, yourName, nameInput, yourJob, jobInput, inputPlace, inputSrc, formNewPlace, formProfile} from './constants.js';
import {closePopup} from './modal.js';
import {openPopup} from './Card.js';
import {addCards} from './Card.js';

// закрытие всех попап по крестику
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//popup редактирования профиля
editProfile.addEventListener('click', function (_event) {
  nameInput.value = yourName.textContent;
  jobInput.value = yourJob.textContent;
  openPopup(popupProfile);
});
 formProfile.addEventListener('submit', (event) => {
  event.preventDefault();
  yourName.textContent = nameInput.value;
  yourJob.textContent = jobInput.value;
  closePopup(popupProfile);
});

//добавление нового места
newPlaceButton.addEventListener('click', function (_event) {
  inputPlace.value = '';
  inputSrc.value = '';
  openPopup(popupNewPlace);
});

//закрытие попап по ESC
document.addEventListener('keydown', function (evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
});

//закрытие попап по overlay
document.addEventListener('click', function (evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.target === popup) {
    closePopup(popup);
  }
})

//слушатель для карточки
formNewPlace.addEventListener('submit', addCards);

//валидация форм
import { showError, hideError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListener, enablevalidation } from './validate.js';


/*const restartValidation = (formElement, options) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement);
    toggleButtonState(inputList, buttonElement);
  });
};*/

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

//options
enablevalidation({
  formSelector: '.popup__edit-profile',
  inputSelector: '.popup__container-field',
  submitButtonSelector: '.popup__container-button',
  inactiveButtonClass: 'popup__container-button_disabled',
  inputErrorClass: 'popup__container-field_error',
  errorClass: 'popup__input-error_active',
});

