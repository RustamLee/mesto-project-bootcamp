//создание карточки

import { contentItemTemplate, popupImageBox, popupImageName, initialCards, contentItems, formNewPlace, popupNewPlace, popupWithImage } from "./constants.js";
import { closePopup, openPopup } from "./modal.js";
import { sentNewCard, deleteLike, sentLike, deleteCard } from "./api.js";
import {userId} from './index.js'

export function createCard(item) {
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
      deleteLike(newContentItem)
      .then((res) => {
        likeButton.classList.remove('content__like_active');
        const likeCounter = newContentItem.querySelector('.content__like-counter');
        likeCounter.textContent = Number(res.likes.length);
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      sentLike(newContentItem)
      .then((res) => {
        likeButton.classList.add('content__like_active');
        const likeCounter = newContentItem.querySelector('.content__like-counter');
        likeCounter.textContent = Number(res.likes.length);
      })
      .catch((err) => {
        console.log(err)
      })
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
    popupImageBox.src = event.target.src;
    popupImageBox.alt = event.target.alt;
    popupImageName.textContent = event.target.alt;
    openPopup(popupWithImage);
  })
  return newContentItem;
};

export function deleteCardByOwner (item){
  deleteCard (item.id)
 .then (function() {
   item.remove();
 })
 .catch((err) => {
   console.log(err)
 })
};

