
import { yourName, yourJob, avatarImage, contentItems, nameInput, jobInput, inputPlace, inputSrc, inputAvatar, imageTrash, itemImage } from './constants.js';
import { createCard, likeCounter} from './card.js';

export function checkResponse(res){
  if (res.ok){
    return res.json();
  }
  return Promise.reject (`Ошибка ${res.status}`);
};

//достаем данные пользователя с сервера
export function getProfileInfo() {
  return fetch('https://nomoreparties.co/v1/wbc-cohort-1/users/me', {
    headers: {
      authorization: '3dd89b95-5c6a-443c-a15c-23b145a16389'
    }
  })
  .then(checkResponse)
};

//достаем карточки с сервера
export function getCards () {
 return fetch('https://nomoreparties.co/v1/wbc-cohort-1/cards', {
  headers: {
    authorization: '3dd89b95-5c6a-443c-a15c-23b145a16389'
  }
})
.then(checkResponse)
};

//отправка данных пользователя на сервер
export function sentProfileInfo() {
   fetch('https://nomoreparties.co/v1/wbc-cohort-1/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '3dd89b95-5c6a-443c-a15c-23b145a16389',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    })
  })
  .then (checkResponse)
}

//добавление новой карточки
export function sentNewCard() {
  fetch('https://nomoreparties.co/v1/wbc-cohort-1/cards', {
    method: 'POST',
    headers: {
      authorization: '3dd89b95-5c6a-443c-a15c-23b145a16389',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: inputPlace.value,
      link: inputSrc.value,
    })
  })
  .then (checkResponse)
  .then((res) => {
    contentItems.prepend(createCard(res));
  })
};

//отправка нового аватара
export function sentNewAvatar() {
  fetch('https://nomoreparties.co/v1/wbc-cohort-1/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '3dd89b95-5c6a-443c-a15c-23b145a16389',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: inputAvatar.value,
    })
  })
  .then (checkResponse)
  .then((res) => {
    console.log(res);
  })
};

// функция удаления карточки

export function deleteCardByOwner (item){
  return deleteCard (item.id)
  .then (function() {
    item.remove();
  })
  .catch((err) => {
    console.log(err)
  })
};
export function deleteCard (id){
  return fetch(`https://nomoreparties.co/v1/wbc-cohort-1/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: '3dd89b95-5c6a-443c-a15c-23b145a16389',
      'Content-Type': 'application/json'
    },
  })
  .then (checkResponse)
};

//отправка лайка
export function sentLike(newContentItem) {
  fetch(`https://nomoreparties.co/v1/wbc-cohort-1/cards/likes/${newContentItem.id}`, {
    method: 'PUT',
    headers: {
      authorization: '3dd89b95-5c6a-443c-a15c-23b145a16389',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    })
  })
  .then (checkResponse)
  .then((res) => {
    console.log(res.likes.length);
    const likeCounter = newContentItem.querySelector('.content__like-counter');
    likeCounter.textContent = Number(res.likes.length);
  })
};
//снятие лайка
export function deleteLike(newContentItem) {
  fetch(`https://nomoreparties.co/v1/wbc-cohort-1/cards/likes/${newContentItem.id}`, {
    method: 'DELETE',
    headers: {
      authorization: '3dd89b95-5c6a-443c-a15c-23b145a16389',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    })
  })
  .then (checkResponse)
  .then((res) => {
    console.log(res.likes.length);
    const likeCounter = newContentItem.querySelector('.content__like-counter');
    likeCounter.textContent = Number(res.likes.length);
  })
};
