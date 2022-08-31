
import '../../src/index.css';
import { editProfile, popupProfile, popupNewPlace, newPlaceButton, closeButtons, yourName, nameInput, yourJob, jobInput, inputPlace, inputSrc, formNewPlace, formProfile, popupAvatar, popupAvatarEdit, formAvatar, inputAvatar, avatarImage, cardOwner } from './constants.js';
import { closePopup } from './modal.js';
import { openPopup } from './card.js';
import { addCards } from './card.js';
import {getProfileInfo, getCards} from './api.js';
import {createCard} from './card.js';
import {sentProfileInfo, sentNewCard, sentNewAvatar} from './api.js'

//открытие попап редактирования аватар
popupAvatarEdit.addEventListener('click', function (event) {
  inputAvatar.value = '';
  openPopup(popupAvatar);
});

//функция замены ссылки на аватар
formAvatar.addEventListener('submit', (event) => {
  event.preventDefault();
  sentNewAvatar();
  avatarImage.style.backgroundImage = `url(${inputAvatar.value})`;
  closePopup(popupAvatar);
});

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
  sentProfileInfo ();
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
import { Promise } from 'core-js';

//options
enablevalidation({
  formSelector: '.popup__edit-profile',
  inputSelector: '.popup__container-field',
  submitButtonSelector: '.popup__container-button',
  inactiveButtonClass: 'popup__container-button_disabled',
  inputErrorClass: 'popup__container-field_error',
  errorClass: 'popup__input-error_active',
});
