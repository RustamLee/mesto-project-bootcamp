import '../../src/index.css';
import { editProfile, popupProfile, popupNewPlace, newPlaceButton, closeButtons, yourName, nameInput, yourJob, jobInput, inputPlace, inputSrc, formNewPlace, formProfile, popupAvatar, popupAvatarEdit, formAvatar, inputAvatar, avatarImage, cardOwne,itemImage } from './constants.js';
import { closePopup, openPopup } from './modal.js';
import {getProfileInfo, getCards} from './api.js';
import {createCard, handleLike} from './card.js';
import {sentProfileInfo, sentNewCard, sentNewAvatar, deleteCardByOwner, deleteCard} from './api.js'

//загрузка данных пользователя
getProfileInfo();

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

//слушатель сохранения новой карточки
formNewPlace.addEventListener('submit', saveNewCard);
function saveNewCard(event){
  event.preventDefault();
  sentNewCard();
  closePopup(popupNewPlace);
}


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

