import '../../src/index.css';
import { editProfile, popupProfile, popupNewPlace, newPlaceButton, yourName, nameInput, yourJob, jobInput, inputPlace, inputSrc, formNewPlace, formProfile, popupAvatar, popupAvatarEdit, formAvatar, inputAvatar, avatarImage, itemImage, contentItems } from './constants.js';
import { closePopup, openPopup } from './modal.js';
import { getProfileInfo, getCards} from './api.js';
import { createCard, userId} from './card.js';
import { sentProfileInfo, sentNewCard, sentNewAvatar, deleteCardByOwner, deleteCard, checkResponse } from './api.js'
import { revalidationForm, enablevalidation, hideError, showError} from './validate.js';

//загрузка данных пользователя и карточек
  Promise.all ([getProfileInfo(), getCards()])
  .then(([userData, cards]) => {
    yourName.textContent = userData.name;
    yourJob.textContent = userData.about;
    avatarImage.style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;
    cards.forEach(item => {
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
  sentNewAvatar();
  event.submitter.textContent = 'Сохранить';
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
  event.target.reset();
  closePopup(popupNewPlace);
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
