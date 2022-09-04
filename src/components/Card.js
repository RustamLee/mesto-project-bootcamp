//создание карточки

import { initialCards, contentItems, formNewPlace, popupNewPlace, popupWithImage } from "./constants.js";
import { closePopup } from "./modal.js";
import { sentNewCard, userId, deleteCard, deleteCardByOwner } from "./api.js"

export function createCard(item) {
  const contentItemTemplate = document.getElementById('content-item').content;
  const newContentItem = contentItemTemplate.querySelector('.content__item').cloneNode(true);
  const itemImage = newContentItem.querySelector('.content__item-image');
  const imageTrash = newContentItem.querySelector('.content__trash');
  newContentItem.querySelector('.content__title').textContent = item.name;
  itemImage.alt = item.name;
  itemImage.src = item.link;
  newContentItem.id = item._id;
  newContentItem.querySelector('.content__like').addEventListener('click', function (event) {
    event.target.classList.toggle('content__like_active');
  });
  if (item.owner._id !== userId) {
    imageTrash.remove();
  } else {
    imageTrash.addEventListener('click', function(){
      deleteCardByOwner(newContentItem)
    })
  }
  itemImage.addEventListener('click', function (event) {
    popupWithImage.querySelector('.popup-image__container').src = event.target.src;
    popupWithImage.querySelector('.popup-image__name').textContent = event.target.alt;
    openPopup(popupWithImage);
  })
  return newContentItem;
};
export function openPopup(popup) {
  popup.classList.add('popup_opened');
};
