
import { yourName, yourJob, avatarImage, contentItems, nameInput, jobInput, inputPlace, inputSrc, inputAvatar, imageTrash, itemImage } from './constants.js';
import { createCard, likeCounter, deleteCardByOwner} from './card.js';

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
   return fetch('https://nomoreparties.co/v1/wbc-cohort-1/users/me', {
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
  return fetch('https://nomoreparties.co/v1/wbc-cohort-1/cards', {
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
};

//отправка нового аватара
export function sentNewAvatar() {
  return fetch('https://nomoreparties.co/v1/wbc-cohort-1/users/me/avatar', {
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
  return fetch(`https://nomoreparties.co/v1/wbc-cohort-1/cards/likes/${newContentItem.id}`, {
    method: 'PUT',
    headers: {
      authorization: '3dd89b95-5c6a-443c-a15c-23b145a16389',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    })
  })
  .then (checkResponse)

};
//снятие лайка
export function deleteLike(newContentItem) {
  return fetch(`https://nomoreparties.co/v1/wbc-cohort-1/cards/likes/${newContentItem.id}`, {
    method: 'DELETE',
    headers: {
      authorization: '3dd89b95-5c6a-443c-a15c-23b145a16389',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    })
  })
  .then (checkResponse)
};
