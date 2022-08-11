// переменные
const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup');
const images = document.querySelectorAll('.content__item-image');
const yourName = document.querySelector('.profile__info-name');
const nameInput = popupProfile.querySelector('#profile-name');
const yourJob = document.querySelector('.profile__info-subtitle');
const jobInput = popupProfile.querySelector('#profile-job');
const formProfile = popupProfile.querySelector('.popup__edit-profile');
const popupAddImage = document.querySelector('.popup-new-place');
const addButton = document.querySelector('.profile__add-button');
const popupAddImageClouse = popupAddImage.querySelector('.popup__container-close');
const formNewPlace = popupAddImage.querySelector('.popup__edit-profile');

//массив с картинками
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

//закрытие попапа редактирования профиля
function closePopup(event) {
  const popup = event.target.closest('.popup');
  popup.classList.remove('popup_opened');
  const popupProfileClose = document.querySelector('.popup__container-close');
  popupProfileClose.removeEventListener('click', closePopup);
  popup.removeEventListener('click', closePopupOverlayClick);
}

//открытие попапа редактирования профиля
function openPopup(popup) {
  const popupProfileClose = document.querySelector('.popup__container-close');
  popupProfileClose.addEventListener('click', closePopup);
  popup.classList.add('popup_opened');
  nameInput.value = yourName.textContent;
  jobInput.value = yourJob.textContent;
}

editButton.addEventListener('click', function (event) {
  openPopup(popupProfile);
});

formProfile.addEventListener('submit', (event) => {
  event.preventDefault();
  yourName.textContent = nameInput.value;
  yourJob.textContent = jobInput.value;
  closePopup(event);
});

addButton.addEventListener('click', function (event) {
  popupAddImage.classList.add('popup-new-place_visible');
});

//клонируем карточку
function addNewContentItem() {
  const contentItemTemplate = document.querySelector('#content-item').content;
  const contentItems = document.querySelector('.content');
  const newContentItem = contentItemTemplate
    .querySelector('.content__item')
    .cloneNode(true);
  const newPlaceTitle = newContentItem.querySelector('.content__title');
  const newPlaceSrc = newContentItem.querySelector('.content__item-image');
  const inputNewPlaceTitle = formNewPlace.querySelector('#new-place-name');
  const inputNewPlaceSrc = formNewPlace.querySelector('#new-place-src');
  // наполняем содержимым
  newPlaceTitle.textContent = inputNewPlaceTitle.value;
  newPlaceSrc.src = inputNewPlaceSrc.value;
  newPlaceSrc.alt = inputNewPlaceTitle.value;
  //выводим на страницу
  contentItems.prepend(newContentItem);

};
//функция закрытия попап
function closePopupAddImage() {
  popupAddImage.classList.remove('popup-new-place_visible');
};
popupAddImageClouse.addEventListener('click', closePopupAddImage);

//вызываем функцию добавления карточки при нажатии на кнопку
formNewPlace.addEventListener('submit', (event) => {
  event.preventDefault();
  addNewContentItem();
  formNewPlace.reset();
  closePopupAddImage();
  const likeUnlike = contentItems.querySelector('.content__like');
  function likePlace(event) {
    likeUnlike.classList.toggle('content__like_active');
  };
  likeUnlike.addEventListener('click', likePlace);

  const deletePlace = contentItems.querySelector('.content__trash');
  deletePlace.addEventListener('click', function () {
    const contentItem = deletePlace.closest('.content__trash');
    contentItem.parentNode.remove();
  });

const popupWithImage = document.querySelector('.popup-image');
const contentImage = contentItems.querySelectorAll('.content__item-image');
function openPopupWithImage(event) {
  const url = event.target.src;
  const alt = event.target.alt;
  popupWithImage.querySelector('img').src = url;
  popupWithImage.querySelector('.popup-image__name').textContent = alt;
  popupWithImage.classList.add('popup-image_opened');
}
contentImage.forEach((image) => {
  image.addEventListener('click', openPopupWithImage)
});
});

//добавление 6 карточек из массива
const contentItems = document.querySelector('.content');
const contentItemTemplate = document.querySelector('#content-item').content;
function loadFixedPlaces() {
  initialCards.forEach(buildCards);
}
function buildCards({ name, link }) {
  const newContentItem = contentItemTemplate
    .querySelector('.content__item')
    .cloneNode(true);
  const newPlaceTitle = newContentItem.querySelector('.content__title').textContent = name;
  const newPlaceSrc = newContentItem.querySelector('.content__item-image').src = link;
  const newPlaceAlt = newContentItem.querySelector('.content__item-image').alt = name;
  contentItems.prepend(newContentItem);
  const deletePlace = contentItems.querySelector('.content__trash');
  deletePlace.addEventListener('click', function () {
    const contentItem = deletePlace.closest('.content__trash');
    contentItem.parentNode.remove();
  });
  const likeUnlike = contentItems.querySelector('.content__like');

  function likePlace(event) {
    likeUnlike.classList.toggle('content__like_active');
  };
  likeUnlike.addEventListener('click', likePlace);
}
//вызываем функцию загрузки карточек на страницу
loadFixedPlaces()

//делаем попап с картинкой
const popupWithImage = document.querySelector('.popup-image');
const contentImage = contentItems.querySelectorAll('.content__item-image');
function openPopupWithImage(event) {
  const url = event.target.src;
  const alt = event.target.alt;
  popupWithImage.querySelector('img').src = url;
  popupWithImage.querySelector('.popup-image__name').textContent = alt;
  popupWithImage.classList.add('popup-image_opened');
}
contentImage.forEach((image) => {
  image.addEventListener('click', openPopupWithImage)
});

//функция закрытия попап с картинкой
const popupWithImageClose = popupWithImage.querySelector('.popup-image__close-button')
function closePopupWithImage(event) {
  popupWithImage.classList.remove('popup-image_opened');
};
popupWithImageClose.addEventListener('click', closePopupWithImage);
