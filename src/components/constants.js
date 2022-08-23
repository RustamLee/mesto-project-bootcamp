
export const editProfile = document.querySelector('.profile__edit-button');
export const popupProfile = document.querySelector('.popup__profile');
export const popupNewPlace = document.querySelector('.popup-new-place');
export const popupWithImage = document.querySelector('.popup-image');
export const newPlaceButton = document.querySelector('.profile__add-button');
export const closeButtons = document.querySelectorAll('.popup__close');
export const yourName = document.querySelector('.profile__info-name');
export const nameInput = popupProfile.querySelector('#profile-name');
export const yourJob = document.querySelector('.profile__info-subtitle');
export const jobInput = popupProfile.querySelector('#profile-job');
export const contentItems = document.querySelector('.content');
export const inputPlace = popupNewPlace.querySelector('#new-place-name');
export const inputSrc = popupNewPlace.querySelector('#new-place-src');
export const formProfile = popupProfile.querySelector('.popup__edit-profile');
export const formNewPlace = popupNewPlace.querySelector('.popup__edit-profile');
export const initialCards = [
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
