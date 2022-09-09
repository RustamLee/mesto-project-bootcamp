import '../../src/index.css';
import { editProfile, popupProfile, popupNewPlace, newPlaceButton, yourName, nameInput, yourJob, jobInput, inputPlace, inputSrc, formNewPlace, formProfile, popupAvatar, popupAvatarEdit, formAvatar, inputAvatar, avatarImage, itemImage, contentItems } from './constants.js';
import { closePopup, openPopup } from './modal.js';
import { getProfileInfo, getCards } from './api.js';
import { createCard, deleteCardByOwner } from './card.js';
import { sentProfileInfo, sentNewCard, sentNewAvatar, deleteCard, checkResponse } from './api.js'
import { revalidationForm, enablevalidation, hideError, showError } from './validate.js';
export let userId;

//загрузка данных пользователя и карточек
Promise.all([getProfileInfo(), getCards()])
  .then(([userData, cards]) => {
    yourName.textContent = userData.name;
    yourJob.textContent = userData.about;
    avatarImage.style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;
    cards.reverse().forEach(item => {
      contentItems.prepend(createCard(item))
    })
  })
  .catch((err) => {
    console.log(err)
  });

//открытие попап редактирования аватар
popupAvatarEdit.addEventListener('click', function (event) {
  inputAvatar.value = '';
  revalidationForm(formAvatar, formOptions);
  openPopup(popupAvatar);
});

//функция замены ссылки на аватар
formAvatar.addEventListener('submit', (event) => {
  event.submitter.textContent = 'Сохранение...';
  event.preventDefault();
  sentNewAvatar()
    .then((res) => {
      avatarImage.style.backgroundImage = `url(${inputAvatar.value})`;
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      event.submitter.textContent = 'Сохранить';
    })
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
  sentProfileInfo()
    .then(() => {
      yourName.textContent = nameInput.value;
      yourJob.textContent = jobInput.value;
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      saveProfile.textContent = 'Сохранить';
    })
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
  sentNewCard()
    .then((res) => {
      contentItems.prepend(createCard(res));
      closePopup(popupNewPlace);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      saveNewPlase.textContent = 'Сохранить';
      event.target.reset();
    })
}

//options
export const formOptions = {
  formSelector: '.popup__edit-profile',
  inputSelector: '.popup__container-field',
  submitButtonSelector: '.popup__container-button',
  inactiveButtonClass: 'popup__container-button_disabled',
  inputErrorClass: 'popup__container-field_error',
  errorClass: 'popup__input-error_active',
};
enablevalidation(formOptions);

