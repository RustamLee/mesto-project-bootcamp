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
    openPopup(popupProfile);
    nameInput.value = yourName.textContent;
    jobInput.value = yourJob.textContent;
  
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
    openPopup(popupNewPlace);
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
  })
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
  