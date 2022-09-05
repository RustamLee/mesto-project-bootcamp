//создание карточки

import { initialCards, contentItems, formNewPlace, popupNewPlace, popupWithImage } from "./constants.js";
import { closePopup, openPopup } from "./modal.js";
import { sentNewCard, userId, deleteCard, deleteCardByOwner, deleteLike, sentLike } from "./api.js";

export function createCard(item) {
  const contentItemTemplate = document.getElementById('content-item').content;
  const newContentItem = contentItemTemplate.querySelector('.content__item').cloneNode(true);
  const itemImage = newContentItem.querySelector('.content__item-image');
  const imageTrash = newContentItem.querySelector('.content__trash');
  const likeCounter = newContentItem.querySelector('.content__like-counter');
  const likeButton = newContentItem.querySelector('.content__like');
  newContentItem.querySelector('.content__title').textContent = item.name;
  itemImage.alt = item.name;
  itemImage.src = item.link;
  newContentItem.id = item._id;
  likeCounter.textContent = Number(item.likes.length);
  //счетчик лайков
  likeButton.addEventListener('click', (event => {
    if (likeButton.classList.contains('content__like_active')) {
      likeButton.classList.remove('content__like_active');
      deleteLike(newContentItem);
    } else {
      likeButton.classList.add('content__like_active');
      sentLike(newContentItem);
    }
  }));
  if (item.likes.length !== 0) {
    item.likes.forEach(element => {
      if (element._id === userId) {
        likeButton.classList.add('content__like_active');
      }
    });
  };
  if (item.owner._id !== userId) {
    imageTrash.remove();
  } else {
    imageTrash.addEventListener('click', function () {
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


