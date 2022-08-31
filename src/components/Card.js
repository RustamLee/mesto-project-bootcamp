//создание карточки

import { initialCards, contentItems, formNewPlace, popupNewPlace, popupWithImage} from "./constants.js";
import { closePopup } from "./modal.js";
import {getCards} from "./index.js";
import {sentNewCard} from "./api.js"

export function createCard(item) {
  const contentItemTemplate = document.getElementById('content-item').content;
  const newContentItem = contentItemTemplate.querySelector('.content__item').cloneNode(true);
  const likeCounter = newContentItem.querySelector('.content__like-counter');
  newContentItem.querySelector('.content__title').textContent = item.name;
  newContentItem.querySelector('.content__item-image').alt = item.name;
  newContentItem.querySelector('.content__item-image').src = item.link;
  newContentItem.querySelector('.content__like').addEventListener('click', function (event) {
    event.target.classList.toggle('content__like_active');
    likeCounter.textContent = +1;
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

export function openPopup(popup) {
  popup.classList.add('popup_opened');
};

//создание новой карточки
export function addCards(event) {
  event.preventDefault();
  sentNewCard();
  const item = {
    name: document.getElementById('new-place-name').value,
    link: document.getElementById('new-place-src').value,
  };
  contentItems.prepend(createCard(item));
  formNewPlace.reset();
  closePopup(popupNewPlace);
};
