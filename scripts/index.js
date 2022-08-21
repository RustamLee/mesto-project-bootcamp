//16/08/2022
//переменные
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const editProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup__profile');
const popupNewPlace = document.querySelector('.popup-new-place');
const popupWithImage = document.querySelector('.popup-image');
const newPlaceButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const yourName = document.querySelector('.profile__info-name');
const nameInput = popupProfile.querySelector('#profile-name');
const yourJob = document.querySelector('.profile__info-subtitle');
const jobInput = popupProfile.querySelector('#profile-job');
const formProfile = popupProfile.querySelector('.popup__edit-profile');
const formNewPlace = popupNewPlace.querySelector('.popup__edit-profile');
const contentItems = document.querySelector('.content');
const inputPlace = popupNewPlace.querySelector('#new-place-name');
const inputSrc = popupNewPlace.querySelector('#new-place-src');

//функция закрытия любого popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//обработчик закрытия всех попап по крестику
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//функция закрытия popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//popup редактирования профиля
editProfile.addEventListener('click', function (_event) {
  nameInput.value = yourName.textContent;
  jobInput.value = yourJob.textContent;
  restartValidation(formProfile);
  openPopup(popupProfile);
});
formProfile.addEventListener('submit', (event) => {
  event.preventDefault();
  yourName.textContent = nameInput.value;
  yourJob.textContent = jobInput.value;
  closePopup(popupProfile);
});
//функция открытия popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
};


newPlaceButton.addEventListener('click', function (_event) {
  inputPlace.value = '';
  inputSrc.value = '';
  openPopup(popupNewPlace);
  restartValidation(popupNewPlace);
});

//создание карточки
function createCard(item) {
  const contentItemTemplate = document.getElementById('content-item').content;
  const newContentItem = contentItemTemplate.querySelector('.content__item').cloneNode(true);
  newContentItem.querySelector('.content__title').textContent = item.name;
  newContentItem.querySelector('.content__item-image').alt = item.name;
  newContentItem.querySelector('.content__item-image').src = item.link;
  newContentItem.querySelector('.content__like').addEventListener('click', function (event) {
    event.target.classList.toggle('content__like_active');
  })
  newContentItem.querySelector('.content__trash').addEventListener('click', function (event) {
    (event.target.closest('.content__item')).remove();
  });
  newContentItem.querySelector('.content__item-image').addEventListener('click', function (event) {
    popupWithImage.querySelector('.popup-image__container').src = event.target.src;
    popupWithImage.querySelector('.popup-image__name').textContent = event.target.alt;
    openPopup(popupWithImage);
  })
  return newContentItem;
};
// заполнение карточек из массива
initialCards.forEach(item => {
  contentItems.prepend(createCard(item));
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
//создание новой карточки
function addCards(event) {
  event.preventDefault();
  const item = {
    name: document.getElementById('new-place-name').value,
    link: document.getElementById('new-place-src').value,
  };
  contentItems.prepend(createCard(item));
  formNewPlace.reset();
  closePopup(popupNewPlace);
};
//слушатель для карточки
formNewPlace.addEventListener('submit', addCards);


//ВАЛИДАЦИЯ ФОРМ

//обработчики ошибок
const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__container-field_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active')
};
const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__container-field_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = "";
};
//функция проверки полей на наличие ошибок
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__container-button_disabled');
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove('popup__container-button_disabled');
    buttonElement.removeAttribute("disabled");
  }
};

const setEventListener = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__container-field'));
  const buttonElement = formElement.querySelector('.popup__container-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const restartValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__container-field'));
  const buttonElement = formElement.querySelector('.popup__container-button');
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement);
    toggleButtonState(inputList, buttonElement);
  });
};

const enablevalidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__edit-profile'));
  formList.forEach((formElement) => {
    setEventListener(formElement);
  });
};

enablevalidation();


