import '../../src/index.css';
import { editProfile, popupProfile, popupNewPlace, newPlaceButton, yourName, nameInput, yourJob, jobInput, inputPlace, inputSrc, formNewPlace, formProfile, popupAvatar, popupAvatarEdit, formAvatar, inputAvatar, avatarImage, itemImage } from './constants.js';
import { closePopup, openPopup } from './modal.js';
import { getProfileInfo, getCards } from './api.js';
import { createCard, handleLike } from './card.js';
import { sentProfileInfo, sentNewCard, sentNewAvatar, deleteCardByOwner, deleteCard } from './api.js'
import {revalidationForm, enablevalidation} from './validate.js';

const formOptions = {
  formSelector: '.popup__edit-profile',
  inputSelector: '.popup__container-field',
  submitButtonSelector: '.popup__container-button',
  inactiveButtonClass: 'popup__container-button_disabled',
  inputErrorClass: 'popup__container-field_error',
  errorClass: 'popup__input-error_active',
};

//загрузка данных пользователя
getProfileInfo();

//открытие попап редактирования аватар
popupAvatarEdit.addEventListener('click', function (event) {
  inputAvatar.value = '';
  revalidationForm(formAvatar, formOptions);
  openPopup(popupAvatar);
});

//функция замены ссылки на аватар
formAvatar.addEventListener('submit', (event) => {
  const saveAvatar = formAvatar.querySelector('#save-avatar');
  saveAvatar.textContent = 'Сохранение...';
  event.preventDefault();
  sentNewAvatar();
  saveAvatar.textContent = 'Сохранить';
  avatarImage.style.backgroundImage = `url(${inputAvatar.value})`;
  closePopup(popupAvatar);
});

//popup редактирования профиля
editProfile.addEventListener('click', function (_event) {
  nameInput.value = yourName.textContent;
  jobInput.value = yourJob.textContent;
  revalidationForm(formProfile, formOptions);
  openPopup(popupProfile);
});

formProfile.addEventListener('submit', (event) => {
  const saveProfile = formProfile.querySelector('#save-profile');
  saveProfile.textContent = 'Сохранение...';
  event.preventDefault();
  sentProfileInfo();
  saveProfile.textContent = 'Сохранить';
  closePopup(popupProfile);
});

//добавление нового места
newPlaceButton.addEventListener('click', function (_event) {
  inputPlace.value = '';
  inputSrc.value = '';
  revalidationForm(formNewPlace, formOptions);
  openPopup(popupNewPlace);
});

// сохранения новой карточки
formNewPlace.addEventListener('submit', saveNewCard);
function saveNewCard(event) {
  const saveNewPlase = formNewPlace.querySelector('#add-place');
  saveNewPlase.textContent = 'Сохранение...';
  event.preventDefault();
  sentNewCard();
  saveNewPlase.textContent = 'Сохранить';
  inputPlace.value = '';
  inputSrc.value = '';
  closePopup(popupNewPlace);
}

//options
enablevalidation(formOptions);
