
import { yourName, yourJob, avatarImage, contentItems, nameInput, jobInput, inputPlace, inputSrc, inputAvatar, imageTrash, itemImage } from './constants.js';
import { createCard, likeCounter} from './card.js';
export let userId;

//достаем данные пользователя с сервера
export function getProfileInfo() {
  fetch('https://nomoreparties.co/v1/wbc-cohort-1/users/me', {
    headers: {
      authorization: '3dd89b95-5c6a-443c-a15c-23b145a16389'
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      yourName.textContent = result.name;
      yourJob.textContent = result.about;
      avatarImage.style.backgroundImage = `url(${result.avatar})`;
      userId = result._id;
    })
    .catch((err) => {
      console.log(err)
    })
};

//достаем карточки с сервера
let getCards = fetch('https://nomoreparties.co/v1/wbc-cohort-1/cards', {
  headers: {
    authorization: '3dd89b95-5c6a-443c-a15c-23b145a16389'
  }
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((result) => {
    result.forEach(item => {
      contentItems.prepend(createCard(item));

    })
  })
  .catch((err) => {
    console.log(err)
  })

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
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((res) => {
    getProfileInfo();
  })
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
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
  })
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
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
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
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

//отправка лайка
export function sentLike(id) {
  fetch(`https://nomoreparties.co/v1/wbc-cohort-1/cards/likes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: '3dd89b95-5c6a-443c-a15c-23b145a16389',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((res) => {
    console.log(res.likes.length);
    //likeCounter.textContent = Number(res.likes.length)+1;
  })
};

//снятие лайка
export function deleteLike(id) {
  fetch(`https://nomoreparties.co/v1/wbc-cohort-1/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: '3dd89b95-5c6a-443c-a15c-23b145a16389',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((res) => {
    console.log(res.likes.length);
   // likeCounter.textContent = Number(res.likes.length)+1;
  })
};
